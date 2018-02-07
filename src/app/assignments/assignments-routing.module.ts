import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignmentComponent} from './assignment.component';
import {AssignmentsComponent} from './assignments/assignments.component';

const routes: Routes = [
  { path: '',
    component: AssignmentComponent,
    children:[
      {path:'',
        component: AssignmentsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
