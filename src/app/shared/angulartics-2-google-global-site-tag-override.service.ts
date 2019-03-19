import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst/angulartics2-gst';
import { Injectable } from '@angular/core';
import { Angulartics2, GoogleGlobalSiteTagSettings } from 'angulartics2';



export class GoogleGlobalSiteTagDefaults implements GoogleGlobalSiteTagSettings {
  trackingIds = [];
  public ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private interval;

  constructor() {
    this.checkForGA();
  }

  private checkForGA () {
    this.interval = setInterval(t => {
      if (typeof window['ga'] !== 'undefined' && window['ga'] && window['ga'].getAll) {
        this.setTrackingIds();
        clearInterval(this.interval);
        this.ready.next(true);
      }
    }, 100);
  }

  private setTrackingIds () {
    window['ga'].getAll().forEach((tracker) => {
      const id = tracker.get('trackingId');
      if (id !== undefined) {
        this.trackingIds.push(id);
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class Angulartics2GoogleGlobalSiteTagOverride {

  private navigationStartTime: number;
  private navigationUrl: string;

  constructor(
    protected angulartics2: Angulartics2,
    router: Router
  ) {
    const defaults = new GoogleGlobalSiteTagDefaults;
    
    defaults.ready.subscribe(ready => {
      if(ready){

        const _defaults = <GoogleGlobalSiteTagSettings> {
          trackingIds : defaults.trackingIds
        }

        // Set the default settings for this module
        this.angulartics2.settings.gst = { ..._defaults, ...this.angulartics2.settings.gst };

        this.angulartics2.pageTrack
          .pipe(this.angulartics2.filterDeveloperMode())
          .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
          .pipe(this.angulartics2.filterDeveloperMode())
          .subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
          .pipe(this.angulartics2.filterDeveloperMode())
          .subscribe((x: any) => this.exceptionTrack(x));
      }
    });

    router.events.subscribe(event => {
      console.log(event);
      const routerEventType = event.constructor.name;
      console.log(routerEventType);

      if(routerEventType === "NavigationStart"){
        event = <NavigationStart> event;
        this.navigationStartTime = new Date().getTime();
        this.navigationUrl = event.url;
      }

      if(routerEventType === "NavigationEnd") {
        const now = new Date().getTime();
        const delta = now - this.navigationStartTime;
                
        if (typeof window['gtag'] !== 'undefined' && window['gtag']) {
          window['gtag']('event', 'timing_complete', {
            'name' : 'routeChange',
            'value' : delta,
            'event_label' : this.navigationUrl,
            'event_category' : 'Route Change'
          });
        }
      }
    });
  }

  /**
   * Manually track page view, see:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
   *
   * @param path relative url
   */
  pageTrack(path: string) {
    if (typeof window['gtag'] !== 'undefined' && window['gtag']) {
      for (const id of this.angulartics2.settings.gst.trackingIds) {
        window['gtag']('config', id, {'page_path': path});
      }
    }
  }

  /**
   * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/events
   *
   * @param action associated with the event
   */
  eventTrack(action: string, properties: any) {
    // TODO: make interface
    //  @param {string} properties.category
    //  @param {string} [properties.label]
    //  @param {number} [properties.value]
    //  @param {boolean} [properties.noninteraction]
    // Set a default GST category
    properties = properties || {};

    if (typeof window['gtag'] !== 'undefined' && window['gtag']) {
      window['gtag']('event', action, {
        event_category: properties.category || 'interaction',
        event_label: properties.label,
        value: properties.value,
        non_interaction: properties.noninteraction,
        ...properties.gstCustom
      });
    }
  }

  /**
   * Exception Track Event in GST. See:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
   *
   */
  exceptionTrack(properties: any) {
    // TODO: make interface
    //  @param {Object} properties
    //  @param {string} [properties.description]
    //  @param {boolean} [properties.fatal]
    if (properties.fatal === undefined) {
      console.log('No "fatal" provided, sending with fatal=true');
      properties.fatal = true;
    }

    properties.exDescription = properties.event ? properties.event.stack : properties.description;

    this.eventTrack('exception', {
      gstCustom: {
        'description': properties.exDescription,
        'fatal': properties.fatal,
        ...properties.gstCustom
      }
    });
  }
}
