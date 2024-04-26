import { animate, group, query, style, transition, trigger } from '@angular/animations';

function slideTo() {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          transformOrigin: 'left',
          transformStyle: 'preserve-3d',
          zIndex: 3,
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ transform: 'rotateY(-90deg)' })]),
    group([
      query(':leave', [animate('0ms ease', style({ left: '130%' }))], optional),
      query(':enter', [animate('500ms ease', style({ transform: 'rotateY(0deg)' }))]),
    ]),
  ];
}

export const slider = trigger('routeAnimations', [transition('* => *', slideTo())]);
