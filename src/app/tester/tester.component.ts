import { Component } from '@angular/core';

import { TesterService } from './tester.service';

@Component({
  template:`
    <div class="container">
    <h2>Tester List</h2></div>
    <router-outlet></router-outlet>
  `,
  providers: [TesterService]
})

export class TesterComponent{

}
