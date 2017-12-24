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
import { Assignment } from './assignment';
import { flatAssignment } from './flatAssignments';

import { Headers, Http, RequestOptions } from '@angular/http';
import { TesterService } from '../tester/tester.service';
import {Tester} from '../tester/tester';

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


  projects: Project[];
  flatAssignments: flatAssignment[];
  testers: Tester[];

  constructor(private http: Http, private testerService:TesterService) {
    console.log("API_URL " + API_URL);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  getProjects(): Observable<Project[]>{
    let ret;
    ret = this.http
      .get(API_URL+'/projects')
      .map(response=>{
        const projects = response.json();
        return projects.map((project)=>new Project(project));
      })
      .catch(this.handleError);
    this.http.get(API_URL+'/projects')
    .subscribe(response=>{
      this.projects = response.json();
      //console.log("Projects:" + JSON.stringify(this.projects));
    });
    return ret;
    //return of(this.projects);
  }

  makeFlatAssignmentTable(){
    this.getProjects().subscribe(response=>{
      this.projects = response;
    });
    console.log(this.projects);
    this.flatAssignments = new Array<flatAssignment>();
    this.loadTesters();
    for (let i = 0; i < this.projects.length; i++) {
        let project:Project = this.projects[i];
        for (let j = 0; j < project.tasks.length; j++) {
            let task:Task = project.tasks[j];
            for (let k = 0; k < task.assignments.length; k++) {
              let flatA: flatAssignment = new flatAssignment();
              flatA.projectId = project._id;
              flatA.projectName = project.projectName;
              flatA.taskId = task._id;
              flatA.taskName = task.taskName;
              flatA.languageAssignment = task.assignments[k].language;
              flatA.testerId = task.assignments[k].tester;
              flatA.testerName = this.getTesterName(flatA.testerId);
              this.flatAssignments.push(flatA);
            }
        }
    }

  }

  loadTesters(){

    this.testerService.getTesters()
    .map(response=>{
      this.testers = response;
      console.log("loadTesters" + this.testers);
    });
  }

  getTesterName(testerId:number):string{
    this.loadTesters();
    let s:string="";
    let ret:Tester = new Tester();
    if (this.testers)
    for (let i = 0; i < this.testers.length; i++) {
        //console.log(this.testers[i]._id + " " + testerId);
        if (this.testers[i]._id == testerId)
        {
          let ret = this.testers[i];
          //console.log(ret);
          return (ret.firstName + " " + ret.lastName);
        }
    }
    else{
      console.log("getTesterName found testers undefined.")
    }
    s = ret.firstName + " " + ret.lastName;
    return s;
  }
  //need to add functions for add, edit and delete
  addProject(project: Project): Observable<Project>{
  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let newId : string;
    console.log("addProject " + JSON.stringify(project));
  return this.http
    .post(API_URL + '/projects', JSON.stringify(project), options)
    .map(response=>{
      return response.json();
    })
    // .subscribe(response=>{
    //   console.log("Sent: " + JSON.stringify(project) + ", " + response.json());
    //   let project1:Project;
    //   project1 = response.json();
    //   newId = project1._id.toString();
    //   console.log("with ID: " + newId);
    //   return newId;
    // });
    //return newId;
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
    return this.http
      .delete(delUrl)
      .map(response=>{
        return response.json();
      });
      // .subscribe(resp=>{
      //   console.log(resp.statusText);
      //   this.projects = resp.json();
      // })
    //return of(this.projects);
    // this.projects = this.projects
    //   .filter(project=>project._id != +projectId); //the + converts to number
    // return of(this.projects);
  }

  getTasksbyPId(projectId: string):Observable<Task[]>{
    let myTasks : Task[];
    console.log("Getting tasks for projectId:" + projectId);
    return this.http
      .get(API_URL+'/projects/' + projectId + '/tasks')
      .map(response=>{
        return response.json();
      })
      // .subscribe(response=>{
      //   console.log("Received tasks " + JSON.stringify(response.json));
      //   const tasks = response.json();
      //   myTasks = tasks;
      //   //return tasks.map((task)=>new Task(task));
      // });

    //return myTasks;
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

  addTaskToProject(projectId: string):Observable<Task>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let newId : string;
      let task : Task;
      console.log("addTask " + JSON.stringify(task));
     return this.http
      .post(API_URL + '/projects/' + projectId + '/tasks', JSON.stringify(task), options)
      .map(response=>{
        return response.json();
      })
      .catch(this.handleError);
      // .subscribe(response=>{
      //   console.log("Sent: " + JSON.stringify(task) + ", " + response.json());
      //   let task1:Task;
      //   task1 = response.json();
      //   newId = task1._id.toString();
      //   console.log("with ID: " + newId);
      //   return newId;
      // });
      //return newId;

  }

  updateTask(projectId: string, taskId: string, task: Task):Observable<Task[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //console.log("Trying to update taskId:" + taskId + " on projectId " + projectId + " with task " + JSON.stringify(task));
    let updateURL = API_URL + '/projects/' + projectId + '/tasks/' + taskId;
    //console.log("API_URL "+updateURL);
    return this.http
      .put(updateURL, JSON.stringify(task), options)
      .map(response=>{
        return response.json();
      })
      .catch(this.handleError);
  }

  deleteTaskFromProject(projectId: string, taskId: string):Observable<Task[]>{
    let project:Project = new Project();
    console.log("projectService: will try to filter " + (projectId));
    let delUrl = API_URL+'/projects/' + projectId + '/tasks/' + taskId;
    console.log(delUrl);
    return this.http
      .delete(delUrl)
      .map(response=>{
        return response.json();
      })
      .catch(this.handleError);
      // .subscribe(resp=>{
      //   console.log(resp.statusText);
      //   project = resp.json();
      //   console.log("got project data " + JSON.stringify(project));
      //   return project.tasks;
      // });
    //return (this.projects);
    // project = this.projects.find(project=>project._id === +projectId);
    // project.tasks.filter(task => task.id != +taskId);
    //return project.tasks;
  }

  getAssignments(projectId: string, taskId: string):Assignment[]{
    let myAssignments : Assignment[];
    console.log("Trying to get tasks for projectId:" + projectId);
    this.http
      .get(API_URL+'/projects/' + projectId + '/tasks/' + taskId + '/assignments')
      .subscribe(response=>{
        console.log("Received tasks " + JSON.stringify(response.json));
        const assignments = response.json();
        myAssignments = assignments;
        //return tasks.map((task)=>new Task(task));
      });

    return myAssignments;
  }

  updateAssignment(projectId:string, taskId:string, lang:string, assignment:Assignment):Observable<Project>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
    let myAssignment;

    this.http
    .put(API_URL+'/projects/'+projectId + '/tasks/' + taskId + '/assignments?lang=' + lang,
      JSON.stringify(assignment), options)
    .subscribe(response=>{
      console.log(response.statusText);

      const assignments = response.json();
      myAssignment = assignments;
      return assignments;
    })
    return myAssignment;
  }
}
