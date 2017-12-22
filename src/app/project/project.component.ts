import { Component } from '@angular/core';

import { ProjectService } from './project.service';
import { TesterService } from '../tester/tester.service';

@Component({
  template:`
    <h2>Projects</h2>
    <router-outlet></router-outlet>
  `,
  providers: [ProjectService, TesterService]
})

export class ProjectComponent{

}
