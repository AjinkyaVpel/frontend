import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/manageStation/openDialog/openDialog.component';

@Component({
  selector: 'app-delete-faq',
  templateUrl: './delete-faq.component.html',
  styleUrls: ['./delete-faq.component.css']
})
export class DeleteFaqComponent {
  dialogData:DialogData | undefined;
  title:string="";
  message:string="";

  constructor(public dialogRef: MatDialogRef<DeleteFaqComponent>,
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
