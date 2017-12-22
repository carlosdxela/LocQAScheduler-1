export class flatAssignment{
  projectId: number;
  projectName: string;
  taskId: number;
  taskName: string;
  languageAssignment: string;
  testerId: number;
  testerName: string;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
