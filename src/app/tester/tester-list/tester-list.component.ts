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
  constructor(private testerService: TesterService) {
    this.testers = this.testerService.getTesters();
   }



}
