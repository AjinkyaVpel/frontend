import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/manageStation/openDialog/openDialog.component';

@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrls: ['./delete-notification.component.css']
})
export class DeleteNotificationComponent {
  dialogData:DialogData | undefined;
  title:string="";
  message:string="";

  constructor(public dialogRef: MatDialogRef<DeleteNotificationComponent>,
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
