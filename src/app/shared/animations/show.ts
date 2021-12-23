import { animate, state, style, transition, trigger } from "@angular/animations"

export const showFromUp=
    trigger('showFromUp',[
      state('show', style({
        opacity:1,
        transform: 'translate3d(0,0,0)'
      })),
      state('hide',style({
        opacity:0,
        'z-index':-1,
        transform: 'translate3d(0,-100%,0)'
      })),
      transition('hide => show',animate('0.5s ease-in')),
      transition('show => hide',animate('1.0s ease-out')),
    ])
  
export const showFromLeft=
    trigger('showFromLeft',[
      state('show', style({
        opacity:1,
        transform: 'translate3d(0,0,0)'
      })),
      state('hide',style({
        opacity:0,
        'z-index':-1,
        transform: 'translate3d(-75%,0,0)'
      })),
      transition('hide => show',animate('0.5s ease-in')),
      transition('show => hide',animate('1.0s ease-out')),
    ])
export const showFromBehind=trigger('showFromBehind',[
    state('show', style({
      opacity:1,
    })),
    state('hide',style({
      opacity:0,
      'z-index':-1,
    })),
    transition('hide => show',animate('0.5s ease-in')),
    transition('show => hide',animate('1.0s ease-out')),
  ])