import { Component, OnInit } from '@angular/core';
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
  tester: Tester;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TesterService
  ) {

  }

  ngOnInit() {
    let id1: String;
    this.tester$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getTesterbyId(params.get('id'))
      );

    this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.service.getTesterbyId(params.get('id')))
        .subscribe((tester:Tester)=>{
          this.tester = new Tester(tester);
          console.log(tester);
        });
  }

  gotoTesters(){
    if(this.tester){
      console.log("Leaving tester: " + this.tester._id);
      this.service.updateTester(this.tester._id.toString(), this.tester);
    }

    this.router.navigate(['/testers']);

  }


}
