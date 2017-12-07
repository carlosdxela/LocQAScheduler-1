import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'testers',
  loadChildren: 'app/tester/tester.module#TesterModule'},
  {path: 'projects',
  loadChildren: 'app/project/project.module#ProjectModule'},
  {path: 'assignments',
  loadChildren: 'app/assignments/project.module#AssignmentsModule'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
