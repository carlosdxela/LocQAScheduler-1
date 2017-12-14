import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Tester } from '../tester';
import { TesterService } from '../tester.service';


@Component({
  selector: 'app-tester-list',
  templateUrl: './tester-list.component.html',
  styleUrls: ['./tester-list.component.css']
})
export class TesterListComponent{

  testers: Observable<Tester[]>;
  selectedTester: Tester;
  constructor(private testerService: TesterService, private router: Router) {

    this.testers = this.testerService.getTesters();
    console.log("Testers in constructor: " + (this.testers));

   }

   onSelect(tester: Tester): void{
     this.selectedTester = tester;
   }

   refresh(){
      this.testers = this.testerService.getTesters();
   }

   addNewTester(){
     let newT = new Tester;

     console.log("New Tester:" + newT);
     this.testerService.addTester(newT);
     //this.router.navigate(['/testers/' + newT.id]);
   }

   deleteTester(testerId){
     if (confirm("Are you sure you want to delete this item?"))
     {
     console.log("Attempt to delete Tester with ID:" + testerId);
     this.testerService.deleteTester(testerId);
     this.testers = this.testerService.getTesters();
    }
    else {
      console.log("Item not deleted");
    }
   }
}
