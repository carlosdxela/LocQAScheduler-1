export class flatAssignment{
  projectId: number;
  projectName: string;
  taskId: number;
  taskName: string;
  startDate:Date;
  endDate:Date;
  languageAssignment: string;
  testerId: number;
  testerName: string;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
