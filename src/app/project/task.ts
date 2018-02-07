import { Assignment } from './assignment';

export class Task{
  _id: number;
  taskName: string = '';
  startDate: Date;
  finishDate: Date;
  assignments: Assignment[];
  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
