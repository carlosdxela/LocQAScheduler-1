import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


import { Tester } from '../tester';
import { TesterService } from '../tester.service';


@Component({
  selector: 'app-tester-detail',
  templateUrl: './tester-detail.component.html',
  styleUrls: ['./tester-detail.component.css']
})
export class TesterDetailComponent {

  tester$: Observable<Tester>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TesterService
  ) {

  }

  ngOnInit() {
    this.tester$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getTesterbyId(params.get('id')));
  }

  gotoTesters(){
    this.router.navigate(['/testers']);
  }

  deleteTester(testerId){
    this.service.deleteTester(testerId);
  }
}
