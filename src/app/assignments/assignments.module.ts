import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AssignmentComponent} from './assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import {AssignmentsRoutingModule} from './assignments-routing.module';

@NgModule({
  imports: [
    SharedModule,CommonModule,AssignmentsRoutingModule
  ],
  declarations: [AssignmentComponent,AssignmentsComponent]
})
export class AssignmentsModule { }
