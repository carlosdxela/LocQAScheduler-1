import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { TesterComponent} from './tester.component';
import { TesterListComponent} from './tester-list/tester-list.component';
import { TesterDetailComponent} from './tester-detail/tester-detail.component';

const routes: Routes = [
  { path: '',
    component: TesterComponent,
    children: [
      {path: '', component: TesterListComponent},
      {path: '', component: TesterDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesterRoutingModule{}
