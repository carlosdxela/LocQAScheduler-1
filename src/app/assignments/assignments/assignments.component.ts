import { Component, OnInit, Input } from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {TesterService} from '../../tester/tester.service';
import {flatAssignment} from '../../project/flatAssignments';
import {Project} from '../../project/project';
import {Task} from '../../project/task';
import {Tester} from '../../tester/tester';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],

})
export class AssignmentsComponent implements OnInit {

  @Input()
  testerId:number;

  projects: Project[];
  flatAssignments:flatAssignment[];
  filteredAssignments:flatAssignment[];
  testers: Tester[];

  selectedTester:Tester;

  constructor(private projectService:ProjectService, private testerService:TesterService) {
  this.flatAssignments = new Array<flatAssignment>()}

  ngOnInit() {
    this.loadflatAssignments();
    this.resetView();
    this.loadTesters();
    if (this.projects)
    console.log("Projects:"+ this.projects);

  }

  testerSelect(){
    console.log("Changing view to filtered by " + this.selectedTester.firstName + " " + this.selectedTester.lastName);
    this.filteredAssignments = this.flatAssignments.filter(tester=>tester.testerId == this.selectedTester._id);
  }

  resetView(){
    console.log("Reseting view.");
    this.filteredAssignments = this.flatAssignments;
  }

  loadflatAssignments(){
    this.projectService.getProjects()
    .subscribe(response=>{
      this.projects = response;
      //console.log("Projects in subscribe:"+ JSON.stringify(this.projects));
      this.makeFlatAssignmentTable();
      this.flatAssignments = this.flatAssignments;
    });
  }
  makeFlatAssignmentTable(){

    //console.log("make:"+JSON.stringify(this.projects));

    for (let i = 0; i < this.projects.length; i++) {
      //console.log("p"+this.projects[i]);
        let project:Project = this.projects[i];
        //console.log("p"+project);
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
              //console.log("flatA:" + JSON.stringify(flatA));
              this.flatAssignments.push(flatA);
            }
        }
    }

  }


  loadTesters(){
    this.testerService.getTesters()
    .subscribe(response=>{
      this.testers = response;
      console.log("Testers:" + JSON.stringify(this.testers));
      //this.makeFlatAssignmentTable();
    });
    //console.log(this.testers);
  }

  getTesterName(testerId:number):string{
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
    //ret = this.testers.filter(function(tester){ return tester._id == +testerId});
    s = ret.firstName + " " + ret.lastName;

    return s;
  }
}
