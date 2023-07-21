import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageFaqService } from 'src/app/apiService/manage-faq.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-faq-dailog',
  templateUrl: './add-faq-dailog.component.html',
  styleUrls: ['./add-faq-dailog.component.css']
})
export class AddFaqDailogComponent {
 faqForm:FormGroup;
 faqId!:string;
constructor(private dialogRef:MatDialogRef<AddFaqDailogComponent>, private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private faqApi:ManageFaqService, private SnackBar:MatSnackBar){

  this.faqForm=this.formBuilder.group({
  faqCategory:'',
  faqSeqNumber:'',
  faqQuestion:'',
  faqAnswer:'',
  });
}

ngOnInit(): void {
 

    this.faqForm.patchValue(this.data);
  }


onCancel(){
  this.dialogRef.close();
}

openSnackBar(message: any,action: any = 'ok') {
  this.SnackBar.open(message,action, {
    duration: 3000,
    verticalPosition: 'bottom',
    panelClass: ['warning']
  });
}

onFormSubmit(){
  if(this.data.faqId){
    this.faqApi.editFaq(this.data.faqId,this.faqForm.value).subscribe(res=>{
      console.log(res);
      this.openSnackBar("Faq updated successfully","Done")
    },err=>{
      console.log(err);
      this.openSnackBar("Something went wrong","Close")
    });
  }
  else if(!this.data.faqId){
  this.faqApi.addFaq(this.faqForm.value).subscribe(res=>{
    console.log(res);
    this.openSnackBar("Faq added successfully","Done")
  },err=>{
    console.log(err);
    this.openSnackBar("Something went wrong","Close")
  });
 
  this.dialogRef.close(true);
  }
  window.location.reload();
}

 

}

