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
import { Headers, Http, RequestOptions } from '@angular/http';

const API_URL = environment.apiUrl;

// const TESTERS: Tester[] = [
//   {id:1, firstName:'John', lastName:'Doe',
//   alias:'', email:'', languages:['es-MX', 'fr-FR']},
//   {id:2, firstName:'Tony', lastName:'Dore',
//   alias:'', email:'', languages:['es-ES']},
//   {id:3, firstName:'Brohn', lastName:'Dole',
//   alias:'', email:'', languages:['fr-FR']},
//   {id:4, firstName:'Dohny', lastName:'Dope',
//   alias:'', email:'', languages:['it-IT']},
//   {id:5, firstName:'Juann', lastName:'Don',
//   alias:'', email:'', languages:['pt-BR']}
// ];

@Injectable()
export class TesterService implements OnInit{

  lastId : number = 5;
  //placeholder
  testers: Tester[];//=TESTERS;



  constructor(private http: Http) {
    console.log("API_URL " + API_URL);
  this.testers = new Array<Tester>();
  }

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
        console.log("getTesters()");
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
  addTester(tester: Tester): Observable<Tester>{
  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let newId : string;
    console.log("testerService.addTester " + tester.toString());
   return this.http
    .post(API_URL + '/testers', JSON.stringify(tester), options)
    .map(response=>{
      return response.json();
    });
    // .subscribe(response=>{
    //   console.log("Sent: " + JSON.stringify(tester) + ", " + response.json());
    //   let tester1:Tester = response.json();
    //   newId = tester1._id.toString();
    //   console.log("with ID: " + newId);
    // });

    //return of(new Tester());
  }

  getTesterbyId(testerId: string): Observable<Tester>{
    // console.log("tester in id: " + this.testers + " looking for " + testerId);
    // return this.getTesters()
    //   .map(testers => testers.find(tester=>tester._id === +testerId));
    return this.http
      .get(API_URL+'/testers/' + testerId)
      .map(response=>{
        console.log(response.statusText);
        const testers = response.json();
        return testers;
      })
      .catch(this.handleError);
  }

  updateTester(testerId: string, tester:Tester): Observable<Tester>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
    let myTest;
    console.log("Preparing to updateTester: " + testerId + " " + JSON.stringify(tester));
    this.http
    .put(API_URL+'/testers/'+testerId, JSON.stringify(tester), options)
    .subscribe(response=>{
      console.log(response.statusText);

      const testers = response.json();
      myTest = testers;
      return testers;
    })
    return myTest;
  }

  deleteTester(testerId: string): Observable<Tester[]>{
    console.log("testerService: will try to filter " + (testerId));
    // this.testers = this.testers
    //   .filter(tester=>tester._id != +testerId);
    let delUrl = API_URL+'/testers/' + testerId;
    console.log(delUrl);
    return this.http
      .delete(delUrl)
      .map(resp=>{
        return resp.json();
      })
      // .subscribe(resp=>{
      //   console.log(resp.statusText);
      //   this.testers = resp.json();
      // })
    //return of(this.testers);
  }
}
