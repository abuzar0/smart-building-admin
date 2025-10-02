import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandCollapseAnimation = trigger('expandCollapse', [
    state('collapsed', style({ height: '0px', overflow: 'hidden', opacity: 0, padding: '0' })),
    state('expanded', style({ height: '*', opacity: 1 })),
    transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
    ])
]);

export const formFieldExpendedAnimation = trigger('smoothExpand', [
    transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
        animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
    ])
])