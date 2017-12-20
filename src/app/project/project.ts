import { Task } from './task';

export class Project {
  _id: number;
  projectName: string = '';
  languages: string[];
  tasks: Task[];

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
