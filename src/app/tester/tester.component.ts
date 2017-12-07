import { Component } from '@angular/core';

import { TesterService } from './tester.service';

@Component({
  template:`
    <h2>Tester List</h2>
    <router-outlet></router-outlet>
  `,
  providers: [TesterService]
})

export class TesterComponent{

}
