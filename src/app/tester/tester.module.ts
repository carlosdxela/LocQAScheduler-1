import { NgModule }            from '@angular/core';

import { SharedModule }        from '../shared/shared.module';

import { TesterComponent }       from './tester.component';
import { TesterDetailComponent } from './tester-detail/tester-detail.component';
import { TesterListComponent }   from './tester-list/tester-list.component';
import { TesterRoutingModule }   from './tester-routing.module';

@NgModule({
  imports: [ SharedModule, TesterRoutingModule ],
  declarations: [
    TesterComponent, TesterDetailComponent, TesterListComponent,
  ]
})
export class TesterModule { }
