import { Component } from '@angular/core';

import { ProjectService } from './project.service';

@Component({
  template:`
    <h2>Projects</h2>
    <router-outlet></router-outlet>
  `,
  providers: [ProjectService]
})

export class ProjectComponent{

}
