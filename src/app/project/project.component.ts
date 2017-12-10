import { Component } from '@angular/core';

import { ProjectService } from './project.service';

@Component({
  template:`
    <h2>Project List</h2>
    <router-outlet></router-outlet>
  `,
  providers: [ProjectService]
})

export class ProjectComponent{

}
