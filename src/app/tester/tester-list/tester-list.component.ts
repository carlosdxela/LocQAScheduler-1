import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  constructor(private testerService: TesterService) {
    this.testers = this.testerService.getTesters();
   }

   onSelect(tester: Tester): void{
     this.selectedTester = tester;
   }

   addNewTester(){
     let newT = new Tester;

     console.log("New Tester:" + newT);
     this.testerService.addTester(newT);
   }

   deleteTester(testerId){
     console.log("Attempt to delete Tester with ID:" + testerId);
     this.testerService.deleteTester(testerId);

   }
}
