import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  title: string;
  message:string;
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  dialogData:DialogData | undefined;
  title:string="";
  message:string="";

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) { 
      this.title=data.title;
      this.message=data.message;
    }

    ngOnInit(){ }
    onConfirm(){
      //close the dialog, return true
      this.dialogRef.close(true);
    }
  
    onDismiss(): void{
      //close the dialog, return true
      this.dialogRef.close(false);
    }
}
