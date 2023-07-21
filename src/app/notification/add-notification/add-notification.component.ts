import { Component,ElementRef,Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotificationService } from 'src/app/apiService/notification.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent {
  // public Editor = ClassicEditor;
  addNotification: FormGroup ;
  htmlContent='';
  update:boolean=false;
  notificationCategory=[
    "Account Management ",
    "Bookings",
    "Feedback",
    "Reward",
  ];
  notificationSubCategory=[
    "Account Activity",
   "Booking Confirmation",
   "Feedback Update Notification",
   "Reward Approval",
  ]
  notificationType =[
    "Push",
    "Pop-Up",
  ];
  notificationSupportedRole=[
  "Admin",
  "Host",
  "User"
  ];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };
  
  constructor(private formBuilder: FormBuilder, private manageNotification:NotificationService,private dialogRef: MatDialogRef<AddNotificationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar){
    this.addNotification = this.formBuilder.group({

      notificationCode:'',
      notificationCategory:'',
      notificationSubCategory:'',
      notificationType: '',
      notificationSupportedRole:'',
      htmlContent:''
    })
  }
  ngOnInit(){
    
    this.update=true;
    
    this.addNotification.patchValue(this.data);  
  }
  openSnackBar(message: any,action: any = 'ok') {
    this.snackBar.open(message,action, {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['warning']
      
    });
  }
  onFormSubmit(){
    if (this.data) {
      this.manageNotification.updateNotification(this.data.notificationId, this.addNotification.value).subscribe((result) => {
      window.location.reload();
       
      });

    }
      else{
    this.manageNotification.addNotificationToList(this.addNotification.value);
    this.openSnackBar("Notification added successfully","Done")
    this.dialogRef.close(true);

    window.location.reload();
  }
  window.location.reload();
} 


}
