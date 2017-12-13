import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import  'rxjs/add/operator/map';

import { Project } from './project';
import { Task } from './task';

const PROJECTS: Project[] = [
  {id:1, projectName:'ProjectX',
  languages:['es-MX', 'fr-FR', 'it-IT'],
  tasks: [
    {id:1, taskName:'Task1',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017'), assignments:[]},
    {id:2, taskName:'Task2',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017'), assignments:[]},
  ]},
  {id:2, projectName:'ProjectXY',
  languages:['es-ES', 'fr-CA', 'pt-BR'],
  tasks: [
    {id:3, taskName:'Task3',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017'), assignments:[]},
    {id:4, taskName:'Task4',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017'), assignments:[]},
  ]},
];

@Injectable()
export class ProjectService {

  lastId : number = 2;
  lastTaskId : number = 4;
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

  getTaskbyPId_TaskId(projectId: string, taskId: string):Observable<Task>{
    let pjs = this.projects.find(project=>project.id === +projectId);
    let tasks = pjs.tasks.find(task=>task.id === +taskId);
    return of(tasks);
  }

  addTaskToProject(projectId: string):Observable<Project[]>{
    let project:Project;
    project = this.projects.find(project=>project.id === +projectId);
    let myTask = new Task();
    myTask.id = this.lastTaskId++;
    project.tasks.push(myTask);
    return of(this.projects);
  }

  deleteTaskFromProject(projectId: string, taskId: string):Task[]{
    let project:Project;
    project = this.projects.find(project=>project.id === +projectId);
    project.tasks.filter(task => task.id != +taskId);
    return project.tasks;
  }
}
