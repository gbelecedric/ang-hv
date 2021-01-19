import { NgModule } from '@angular/core';
import { ActionPopComponent } from './action-pop/action-pop';
import { MemberActionComponent } from './member-action/member-action';
import { EventActionComponent } from './event-action/event-action';
@NgModule({
    declarations: [ActionPopComponent,
        ActionPopComponent,
        MemberActionComponent,
        EventActionComponent
    ],
    imports: [],
    exports: [ActionPopComponent,
        ActionPopComponent,
        MemberActionComponent,
        EventActionComponent
    ]
})
export class ComponentsModule { }
