import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'testers',
<<<<<<< HEAD
  loadChildren: 'app/tester/tester.module#TesterModule'}
=======
  loadChildren: 'app/tester/tester.module#TesterModule'},
  {path: '**', component: PageNotFoundComponent}
>>>>>>> 41fb259ef3150ad5faf02b2e91272c64f09af420
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
