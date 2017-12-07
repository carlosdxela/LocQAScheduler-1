import { Injectable } from '@angular/core';
import { Tester } from './tester';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

const TESTERS: Tester[] = [
  {id:1, firstName:'John', lastName:'Doe',
  alias:'', email:'', languages:['es-MX']},
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
export class TesterService {

  lastId : number = 0;
  //placeholder


  constructor() { }

  getTesters(): Observable<Tester[]>{
    return of(TESTERS).pipe(delay(500));
  }

  //need to add functions for add, edit and delete
}
