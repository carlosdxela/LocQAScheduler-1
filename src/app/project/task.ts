
export class Task{
  id: number;
  taskName: string = '';
  startDate: Date;
  finishDate: Date;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
