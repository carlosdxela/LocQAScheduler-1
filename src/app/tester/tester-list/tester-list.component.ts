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

  testers$: Observable<Tester[]>;
  testers: Tester[];
  selectedTester: Tester;
  constructor(private testerService: TesterService, private router: Router) {
    //this.testers$ = this.testerService.getTesters();
    this.refreshTester()
   }

   ngOnInit(){
     this.refreshTester();
    //this.testers = this.testerService.getTesters();
   }

   onSelect(tester: Tester): void{
     this.selectedTester = tester;
   }

   refreshTester(){
     this.testers$ = this.testerService.getTesters();
     this.testerService.getTesters()
     .subscribe(response=>{
       this.testers = response;
       //console.log("testers_ "+JSON.stringify(this.testers));
     });
     //console.log("testers "+ (this.testers));

   }

   addNewTester(){
     let newT = new Tester;
     newT.firstName = "";
     newT.lastName = "";
     console.log("New Tester:" + JSON.stringify(newT));
     //let newId:String = this.testerService.addTester(newT);
     this.testerService.addTester(newT)
     .subscribe(response =>{
       let tester = new Tester(response);
       let newId:number = tester._id;
       console.log("new TesterID" + newId);
       if(newId != null)
       {
         this.router.navigate(['/testers/' + newId]);
       }
     })

   }

   deleteTester(testerId){
     if (confirm("Are you sure you want to delete this item?"))
     {
     //console.log("Attempt to delete Tester with ID:" + testerId);
     this.testerService.deleteTester(testerId)
     .subscribe(resp=>{
        this.refreshTester();
     });

    }
    else {
      console.log("Item not deleted");
    }
   }
}
