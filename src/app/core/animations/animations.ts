import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';
  
export const SlideInOutAnimation = 
trigger('slideInOut', [
    state('1', style({ 'max-height': '500px', opacity: 1 })),
    state('0', style({ 'max-height': '0px', opacity: 0, padding : '0px' })),
    transition(':enter', animate('400ms ease-in-out')),
    transition('* => *', animate('400ms ease-in-out')),
]);