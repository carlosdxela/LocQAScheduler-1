import { Component } from '@angular/core';

import { ProjectService } from '../project/project.service';
import { TesterService } from '../tester/tester.service';

@Component({
  template:`
    <h2>Assignments</h2>
    <router-outlet></router-outlet>
  `,
  providers: [ProjectService,TesterService]
})

export class AssignmentComponent{

}
