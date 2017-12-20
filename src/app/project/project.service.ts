import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Project } from './project';
import { Task } from './task';
import { Headers, Http, RequestOptions } from '@angular/http';

const API_URL = environment.apiUrl;

// const PROJECTS: Project[] = [
//   {_id:1, projectName:'ProjectX',
//   languages:['es-MX', 'fr-FR', 'it-IT'],
//   tasks: [
//     {id:1, taskName:'Task1',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017'), assignments:[]},
//     {id:2, taskName:'Task2',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017'), assignments:[]},
//   ]},
//   {id:2, projectName:'ProjectXY',
//   languages:['es-ES', 'fr-CA', 'pt-BR'],
//   tasks: [
//     {id:3, taskName:'Task3',startDate:new Date('01/01/2017'),finishDate:new Date('02/02/2017'), assignments:[]},
//     {id:4, taskName:'Task4',startDate:new Date('02/02/2017'),finishDate:new Date('03/03/2017'), assignments:[]},
//   ]},
// ];

@Injectable()
export class ProjectService {

  lastId : number = 2;
  lastTaskId : number = 4;
  //placeholder
  projects: Project[];

  constructor(private http: Http) { }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  getProjects(): Observable<Project[]>{
    return this.http
      .get(API_URL+'/projects')
      .map(response=>{
        const projects = response.json();
        return projects.map((project)=>new Project(project));
      })
      .catch(this.handleError);
    //return of(this.projects);
  }

  //need to add functions for add, edit and delete
  addProject(project: Project): string{
  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let newId : string;
    console.log("addProject " + JSON.stringify(project));
   this.http
    .post(API_URL + '/projects', JSON.stringify(project), options)
    .subscribe(response=>{
      console.log("Sent: " + JSON.stringify(project) + ", " + response.json());
      let project1:Project;
      project1 = response.json();
      newId = project1._id.toString();
      console.log("with ID: " + newId);
      return newId;
    });
    return newId;
  }

  getProjectbyId(projectId: string): Observable<Project>{
    return this.http
      .get(API_URL+'/projects/' + projectId)
      .map(response=>{
        console.log(response.statusText);
        const projects = response.json();
        return projects;
      })
      .catch(this.handleError);
    // return this.getProjects()
    //   .map(projects => projects.find(project=>project.id === +projectId));
  }

  updateProject(projectId:string, project:Project):Observable<Project>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
    let myProject;
    console.log("Preparing to updateTester: " + projectId + " " +
    JSON.stringify(project));
    this.http
    .put(API_URL+'/projects/'+projectId, JSON.stringify(project), options)
    .subscribe(response=>{
      console.log(response.statusText);

      const projects = response.json();
      myProject = projects;
      return projects;
    })
    return myProject;
  }

  deleteProject(projectId: string): Observable<Project[]>{
    console.log("projectService: will try to filter " + (projectId));
    let delUrl = API_URL+'/projects/' + projectId;
    console.log(delUrl);
    this.http
      .delete(delUrl)
      .subscribe(resp=>{
        console.log(resp.statusText);
        this.projects = resp.json();
      })
    return of(this.projects);
    // this.projects = this.projects
    //   .filter(project=>project._id != +projectId); //the + converts to number
    // return of(this.projects);
  }

  getTasksbyPId(projectId: string):Task[]{
    let myTasks : Task[];
    console.log("Trying to get tasks for projectId:" + projectId);
    this.http
      .get(API_URL+'/projects/' + projectId + '/tasks')
      .subscribe(response=>{
        console.log("Received tasks " + JSON.stringify(response.json));
        const tasks = response.json();
        myTasks = tasks;
        //return tasks.map((task)=>new Task(task));
      });

    return myTasks;
  }
  getTaskbyPId_TaskId(projectId: string, taskId: string):Observable<Task>{
    // let pjs = this.projects.find(project=>project._id === +projectId);
    // let tasks = pjs.tasks.find(task=>task.id === +taskId);
    return this.http
      .get(API_URL+'/projects/' + projectId + '/tasks/' + taskId)
      .map(response=>{
        console.log(response.statusText);
        const task = response.json();
        return task;
      })
      .catch(this.handleError);
    //return of(task);
  }

  addTaskToProject(projectId: string):string{
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let newId : string;
      let task : Task;
      console.log("addTask " + JSON.stringify(task));
     this.http
      .post(API_URL + '/projects/' + projectId + '/tasks', JSON.stringify(task), options)
      .subscribe(response=>{
        console.log("Sent: " + JSON.stringify(task) + ", " + response.json());
        let task1:Task;
        task1 = response.json();
        newId = task1._id.toString();
        console.log("with ID: " + newId);
        return newId;
      });
      return newId;
    // let project:Project;
    // project = this.projects.find(project=>project._id === +projectId);
    // let myTask = new Task();
    // myTask.id = this.lastTaskId++;
    // project.tasks.push(myTask);
    //return of(this.projects);
  }

  deleteTaskFromProject(projectId: string, taskId: string):Task[]{
    let project:Project = new Project();
    console.log("projectService: will try to filter " + (projectId));
    let delUrl = API_URL+'/projects/' + projectId + '/tasks/' + taskId;
    console.log(delUrl);
    this.http
      .delete(delUrl)
      .subscribe(resp=>{
        console.log(resp.statusText);
        project = resp.json();
        console.log("got project data " + JSON.stringify(project));
        return project.tasks;
      });
    //return (this.projects);
    // project = this.projects.find(project=>project._id === +projectId);
    // project.tasks.filter(task => task.id != +taskId);
    return project.tasks;
  }
}
