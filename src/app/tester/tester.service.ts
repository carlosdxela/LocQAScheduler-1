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
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

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

  lastId : number = 6;
  //placeholder
  testers: Observable<Tester[]>;



  constructor(private http: HttpClient) {
    //this.testers=this.getTesters();
  }

  ngOnInit(){
    this.testers=this.getTesters();
  }

  getTesters(): Observable<Tester[]>{
    // return this.http
    //   .get(API_URL+'/testers')
    //   .map(response=>{
    //     const testers = response.json();
    //     console.log(response.json());
    //     return testers.map((tester)=>new Tester(tester));
    //   })
    //   .catch(this.handleError);
    console.log("In tester.service.getTesters.");
    this.http.get<Tester[]>(API_URL+'/testers').subscribe(data=>{
      //let testerInstance = Object.assign(new Tester(), data);
      console.log("  " + data);
      this.testers = of(data);

    },
    (err: HttpErrorResponse)=>{
      if (err.error instanceof Error){
        console.log('An error occurred:', err.error.message);
      } else{
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });
    return this.testers;
    //return of(this.testers).pipe(delay(500));
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  //need to add functions for add, edit and delete
  addTester(tester: Tester): Observable<Tester[]>{
    // tester.id = ++this.lastId; //take this out once proper id is managed by REST API
    // console.log("Tester "+ tester.id + " - " + JSON.stringify(tester));
    // return this.http
    //   .post(API_URL+'/testers', tester)
    //   .map(response=>{
    //     console.log("Tester to add:" + JSON.stringify(tester));
    //     return new Tester(response.json());
    //   })
    //   .catch(this.handleError);
    // if (!tester.id){
    //   tester.id = ++this.lastId;
    // }
    // this.testers.push(tester);
     return this.testers;
  }

  getTesterbyId(testerId: string): Observable<Tester>{
    let t:Tester;
    this.http.get<Tester>(API_URL+'/testers/' + testerId).subscribe(data=>{
      //let testerInstance = Object.assign(new Tester(), data);
      console.log("  " + data);
      t = (data);
    });
    return of(t);
    // return this.getTesters()
    //  .find(tester=>tester.id === +testerId);
  }

  deleteTester(testerId: string): Observable<Tester[]>{
    console.log("testerService: will try to filter " + (testerId));
    // let delURL:string;
    // delURL = API_URL + '/testers/' + testerId;
    // console.log(delURL);
    // return this.http
    //   .delete(delURL)
    //   .map(response=>{
    //     console.log(response.status + " - " + response.statusText);
    //     return response.json();
    //   })
    //   .catch(this.handleError);
    // this.testers = this.testers
    //   .filter(tester=>tester.id != +testerId);
    return (this.testers);
  }
}
