import { Component,  Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-assignments-detail-dialog',
  templateUrl: './assignments-detail-dialog.component.html',
  styleUrls: ['./assignments-detail-dialog.component.css']
})
export class AssignmentsDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AssignmentsDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
   { }

  cancelClick(): void{
    this.dialogRef.close();
  }

}
