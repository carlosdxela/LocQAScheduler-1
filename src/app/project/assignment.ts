export class Assignment{
  id: number;
  language: string = '';
  testerId: number; 

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
