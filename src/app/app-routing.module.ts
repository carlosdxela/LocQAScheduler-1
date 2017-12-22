import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'testers',
  loadChildren: 'app/tester/tester.module#TesterModule'},
  {path: 'projects',
  loadChildren: 'app/project/project.module#ProjectModule'},
  {path: 'assignments',
  loadChildren: 'app/assignments/assignments.module#AssignmentsModule'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
