import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';
  
export const SlideInOutAnimation = 
trigger('slideInOut', [
    state('1', style({ 'display' : 'block', 'max-height': '1000px', opacity: 1 })),
    state('0', style({ 'display' : 'none',  'max-height': '0px', opacity: 0, padding : '0px' })),
    transition(':enter', animate('400ms ease-in-out')),
    transition('* => *', animate('400ms ease-in-out'))
]);

export const FadeInOutAnimation = trigger('fadeInOut', [
    state('1', style({'display' : 'block'})),
    state('0', style({'display' : 'none' , 'opacity' : 0})),
    transition(':enter', animate('200ms ease-in-out')),
    transition('* => *', animate('200ms ease-in-out'))
]);

export const FadeInOutRuterAnimation = trigger('fadeInOutRouter', [
     state('1', style({'background-color' : 'white'})),
     state('0', style({'background-color' : 'white'})),
    // transition('0 => 1', 
    //     group([
    //         style({ transform: 'translateX(110%)' }),
    //         animate('0.25s ease-in-out', style({ transform: 'translateX(0%)' }))
    //     ])
    // ),
    transition('1 => 0', 
        group([
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    )
    // transition('0 => 1', animate('500ms ease-in-out')),
    // transition('1 => 0', animate('0ms ease-in-out'))
]);

export const MenuSlideClose = trigger('closeMenu', [
    state('1', style({ 'min-width' : 'inherit', 'width' : 'inherit'})),
    state('0', style({ 'min-width' : '0rem', 'width' : '0rem'})),
    transition(':enter', animate('1000ms ease-in-out')),
    transition('* => *', animate('1000ms ease-in-out'))
]);

