import { Injectable } from '@angular/core';
import { Project } from './project';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import  'rxjs/add/operator/map';

import { Task } from './task';

const PROJECTS: Project[] = [
  {id:1, projectName:'ProjectX',
  languages:['es-MX', 'fr-FR', 'it-IT'],
  tasks: [
    {id:1, taskName:'Task1',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017')},
    {id:2, taskName:'Task2',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017')},
  ]},
  {id:2, projectName:'ProjectXY',
  languages:['es-ES', 'fr-CA', 'pt-BR'],
  tasks: [
    {id:3, taskName:'Task3',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017')},
    {id:4, taskName:'Task4',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017')},
  ]},
];

@Injectable()
export class ProjectService {

  lastId : number = 2;
  //placeholder
  projects: Project[]=PROJECTS;

  constructor() { }

  getProjects(): Observable<Project[]>{
    return of(this.projects);
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
      .filter(project=>project.id != +projectId); //the + converts to number
    return of(this.projects);
  }

  addTaskToProject(projectId: string):Observable<Project[]>{
    let project:Observable<Project>;
    project = this.getProjectbyId(projectId);

    return of(this.projects);
  }

  deleteTaskFromProject(projectId: string, taskId: string){
    let project:Observable<Project>;
    project = this.getProjectbyId(projectId);
  }
}
