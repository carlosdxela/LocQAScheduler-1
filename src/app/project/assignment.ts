export class Assignment{
  _id: number;
  language: string = '';
  tester: number; 

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
