import {
    style, animate, animation, animateChild, useAnimation, group, sequence,
    transition, state, trigger, query, stagger, AnimationMetadata
} from '@angular/animations';


export const animations = [
    trigger('scrollAnimation', [
        state('show', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        state('hide', style({
            opacity: 0,
            transform: 'translateY(15%)'
        })),
        transition('show => hide', animate('700ms ease-out')),
        transition('hide => show', animate('1000ms 0ms ease-out'))
    ]),
    trigger('scrollTitle', [
        state('show', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        state('hide', style({
            opacity: 0,
            transform: 'translateY(-15%)'
        })),
        transition('show => hide', animate('700ms ease-out')),
        transition('hide => show', animate('1000ms 0ms ease-out'))
    ]),
    // nice stagger effect when showing existing elements
    // trigger('list', [
    //     transition(':enter', [
    //         // child animation selector + stagger
    //         query('@items',
    //             stagger(300, animateChild())
    //         )
    //     ]),
    // ]),
    // trigger('items', [
    //     // cubic-bezier for a tiny bouncing feel
    //     transition(':enter', [
    //         style({ transform: 'scale(0.5)', opacity: 0 }),
    //         animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
    //             style({ transform: 'scale(1)', opacity: 1 }))
    //     ]),
    //     transition(':leave', [
    //         style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    //         animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
    //             style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
    //     ]),
    // ])
];


const ANIMATION_PARENT2: AnimationMetadata[] = [
  style({ position: 'relative' }),
  query(':enter, :leave', [ style({ position: 'absolute', top: -11, bottom: 0, width: '100%' })]),
  query(':enter', [ style({ bottom: '-50%', opacity: 0 }) ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [ animate('700ms ease-in-out', style({ bottom: '50%', opacity: 0 })) ], { optional: true }),
    query(':enter', [ animate('800ms ease-in-out', style({ bottom: '0%', opacity: 1 })) ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];


export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', ANIMATION_PARENT2)
]);

export const slideInAnimation2 =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
