import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Assignment } from '../assignment';
import { Tester } from '../../tester/tester';
import {ProjectService } from '../project.service';
import {TesterService} from '../../tester/tester.service';

import {AssignmentsDetailDialogComponent} from './assignments-detail-dialog/assignments-detail-dialog.component';


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
  selectedTester:Tester;

  constructor(
    private projectService:ProjectService,
    private testerService: TesterService,
    public dialog:MatDialog
  ) {
    this.assignmentTesters = new Array<String>();
   }

  ngOnInit() {
    this.loadTesters();
    //console.log("Assignments:" + JSON.stringify(this.assignments));
  }

  openDialog():void{
    let dialogRef = this.dialog.open(AssignmentsDetailDialogComponent, {
      width: '250px',
      data: {name:"Changuito", animal:"Me"}
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log("the dialog was closed." + result);

    });
  }

  onTesterSelect(testerId:number){
      console.log("Chose " + testerId);
  }

  testerSelect(assignId:number, lang:string){
    console.log("Choosing: " + JSON.stringify(this.selectedTester) + " for assigment " + assignId);
    //Change assignment(assignId).tester = this.selectedTester._id
    let changedAssign = this.assignments.find((assign,i) =>{
      if(assign._id == assignId){
        this.assignments[i].tester = this.selectedTester._id;
        this.loadTesters();
        this.projectService.updateAssignment(this.project_Id, this.task_Id, lang, this.assignments[i]);
        return true;
      }
    });
    changedAssign.tester = this.selectedTester._id;
    console.log("changedAssign: " + JSON.stringify(changedAssign));
    //this.assignments(assignId).tester = this.selectedTester._id;
  }

  loadTesters(){
    this.testerService.getTesters()
    .subscribe(response=>{
      this.testers = response;
      this.assignmentTesters.length=0;
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
