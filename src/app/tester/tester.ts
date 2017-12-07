export class Tester {
  id: number;
  firstName: string = '';
  lastName: string = '';
  alias: string = '';
  email: string = '';
  languages: string[];

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
