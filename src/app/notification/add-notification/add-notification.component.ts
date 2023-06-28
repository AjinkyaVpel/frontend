import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/apiService/notification.service';



@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent {
  addNotification: FormGroup ;
  notificationType =[
    "Push",
    "Pop-Up",
  ]
  constructor(private formBuilder: FormBuilder, private manageNotification:NotificationService,private dialogRef: MatDialogRef<AddNotificationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar){
    this.addNotification = this.formBuilder.group({
      notificationCode:'',
      notificationType: '',
      notificationData: '',
    })
  }
  ngOnInit(){
    
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
