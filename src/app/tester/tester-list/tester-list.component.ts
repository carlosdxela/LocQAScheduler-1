import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Tester } from '../tester';
import { TesterService } from '../tester.service';


@Component({
  selector: 'app-tester-list',
  templateUrl: './tester-list.component.html',
  styleUrls: ['./tester-list.component.css']
})
export class TesterListComponent implements OnInit{

  testers: Observable<Tester[]>;
  selectedTester: Tester;
  constructor(private testerService: TesterService, private router: Router) {
    this.testers = this.testerService.getTesters();
   }

   ngOnInit(){
    this.testers = this.testerService.getTesters();
   }

   onSelect(tester: Tester): void{
     this.selectedTester = tester;
   }

   addNewTester(){
     let newT = new Tester;
     newT.firstName = "";
     newT.lastName = "";
     console.log("New Tester:" + JSON.stringify(newT));
     let newId:String = this.testerService.addTester(newT);
     console.log(newId);
     if(newId != null && newId != "")
     {
       this.router.navigate(['/testers/' + newId]);
     }
   }

   deleteTester(testerId){
     if (confirm("Are you sure you want to delete this item?"))
     {
     //console.log("Attempt to delete Tester with ID:" + testerId);
     this.testerService.deleteTester(testerId);
     this.testers = this.testerService.getTesters();
    }
    else {
      console.log("Item not deleted");
    }
   }
}
