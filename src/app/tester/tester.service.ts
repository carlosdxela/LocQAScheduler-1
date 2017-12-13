import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OnInit } from '@angular/core';
import { Tester } from './tester';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http } from '@angular/http';

const API_URL = environment.apiUrl;

const TESTERS: Tester[] = [
  {id:1, firstName:'John', lastName:'Doe',
  alias:'', email:'', languages:['es-MX', 'fr-FR']},
  {id:2, firstName:'Tony', lastName:'Dore',
  alias:'', email:'', languages:['es-ES']},
  {id:3, firstName:'Brohn', lastName:'Dole',
  alias:'', email:'', languages:['fr-FR']},
  {id:4, firstName:'Dohny', lastName:'Dope',
  alias:'', email:'', languages:['it-IT']},
  {id:5, firstName:'Juann', lastName:'Don',
  alias:'', email:'', languages:['pt-BR']}
];

@Injectable()
export class TesterService implements OnInit{

  lastId : number = 5;
  //placeholder
  testers: Tester[]=TESTERS;



  constructor(private http: Http) { }

  ngOnInit():void{
//    this.http.get(API_URL+'/testers').subscribe(data=>{
//      this.testers = data['testers'];
//    });
  }
  getTesters(): Observable<Tester[]>{
    return this.http
      .get(API_URL+'/testers')
      .map(response=>{
        const testers = response.json();
        return testers.map((tester)=>new Tester(tester));
      })
      .catch(this.handleError);
    //return of(this.testers).pipe(delay(500));
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  //need to add functions for add, edit and delete
  addTester(tester: Tester): Observable<Tester[]>{
    if (!tester.id){
      tester.id = ++this.lastId;
    }
    this.testers.push(tester);
    return of(this.testers);
  }

  getTesterbyId(testerId: string): Observable<Tester>{
    return this.getTesters()
      .map(testers => testers.find(tester=>tester.id === +testerId));
  }

  deleteTester(testerId: string): Observable<Tester[]>{
    console.log("testerService: will try to filter " + (testerId));
    this.testers = this.testers
      .filter(tester=>tester.id != +testerId);
    return of(this.testers);
  }
}
