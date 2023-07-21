import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-view-faq-details',
  templateUrl: './view-faq-details.component.html',
  styleUrls: ['./view-faq-details.component.css']
})
export class ViewFaqDetailsComponent {
  faq:any;
  


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ViewFaqDetailsComponent>){
    this.faq=data;
    console.log(this.faq)
  }
  closePopup() {
    this.dialogRef.close();
  }
}
