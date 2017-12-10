import { Injectable } from '@angular/core';
import { Project } from './project';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import  'rxjs/add/operator/map';

const PROJECTS: Project[] = [
  {id:1, projectName:'ProjectX',
  languages:['es-MX', 'fr-FR', 'it-IT'], tasks: []},

];

@Injectable()
export class ProjectService {

  lastId : number = 1;
  //placeholder
  projects: Project[]=PROJECTS;

  constructor() { }

  getProjects(): Observable<Project[]>{
    return of(this.projects).pipe(delay(500));
  }

  //need to add functions for add, edit and delete
  addProject(project: Project): Observable<Project[]>{
    if (!project.id){
      project.id = ++this.lastId;
    }
    this.projects.push(project);
    return of(this.projects);
  }

  getProjectbyId(projectId: string): Observable<Project>{
    return this.getProjects()
      .map(projects => projects.find(project=>project.id === +projectId));
  }

  deleteProject(projectId: string): Observable<Project[]>{
    console.log("projectService: will try to filter " + (projectId));
    this.projects = this.projects
      .filter(project=>project.id != +projectId);
    return of(this.projects);
  }
}
