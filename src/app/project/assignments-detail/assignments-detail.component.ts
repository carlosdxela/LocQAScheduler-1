import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from '../assignment';
import { Tester } from '../../tester/tester';
import {ProjectService } from '../project.service';
import {TesterService} from '../../tester/tester.service';

@Component({
  selector: 'app-assignments-detail',
  templateUrl: './assignments-detail.component.html',
  styleUrls: ['./assignments-detail.component.css']
})
export class AssignmentsDetailComponent implements OnInit {

  @Input()
  assignments:Assignment[];

  @Input()
  project_Id:string;

  @Input()
  task_Id:string;

  testers:Tester[];
  assignmentTesters:String[];

  constructor(private projectService:ProjectService, private testerService: TesterService) {
    this.assignmentTesters = new Array<String>();
   }

  ngOnInit() {
    this.loadTesters();
    //console.log("Assignments:" + JSON.stringify(this.assignments));
  }

  loadTesters(){
    this.testerService.getTesters()
    .subscribe(response=>{
      this.testers = response;
      for (let i = 0; i < this.assignments.length; i++)
      {
          //console.log("Assigned Tester: "+this.assignments[i].tester);
          let found = this.getTesterName(this.assignments[i].tester);
          if (found != ""){
            this.assignmentTesters.push(found);
            //console.log("-" + found);
          }
      }
      //console.log(this.assignmentTesters);
    });
    //console.log(this.testers);
  }

  getTesterName(testerId:number):String{
    let s:string="";
    let ret:Tester = new Tester();

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
