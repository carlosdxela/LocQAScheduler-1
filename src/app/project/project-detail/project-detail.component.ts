import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


import { Project } from '../project';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project$: Observable<Project>;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectService
  ) {

  }

  ngOnInit() {
    //this.project$ =
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getProjectbyId(params.get('projectId')))
      .subscribe((project:Project)=>{
        this.project = new Project(project);
        console.log(project);
      });
  }

  gotoProjects(){
    console.log("Leaving project " + JSON.stringify(this.project));
    this.service.updateProject(this.project._id.toString(), this.project);
    this.router.navigate(['/projects']);
  }


}
