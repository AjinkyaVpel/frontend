import { Component, ViewChild } from '@angular/core';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../apiService/notification.service';
import { DeleteNotificationComponent } from './delete-notification/delete-notification.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  dataSource!: MatTableDataSource<any>;
  stationId!:string;
  displayedColumns: string[] = [ 'id','notificationCode','notificationCategory','notificationSubCategory', 'notificationType','notificationSupportedRole','menu'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor( private dialog:MatDialog, private notificationApi:NotificationService,){ }
  ngOnInit(){
    this.getAllNotifications();
  }
  getAllNotifications(){
    this.notificationApi.getNotification().subscribe({
      next: (res:any) => {
       // console.warn(res);
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     },
     error: (err) => {
      console.log(err);
    } })
    }
  addNotificationDialog() {
    const dialogRef = this.dialog.open(AddNotificationComponent,{width:'700px'})
  }
  onDeleteNotification(notificationId:any){
    //console.warn("delete");
    //this.deleteService.openConfirmDialog()
  
    const dialogRef = this.dialog.open(DeleteNotificationComponent, {

      maxWidth: "400px",

      data: {

        title: "Are you sure?",

        message: "Are you sure you want to delete user "

      }

    });




    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {

        this.notificationApi.deleteNotificationById(notificationId).subscribe((result: any) => {
          console.log(result)
         

        })

      }
      // if user pressed yes dialogResult will be true,

      // if he pressed no - it will be false

      console.log(dialogResult);
      window.location.reload();


    });
  }
  onUpdateNotification(data:any){
    const dialogRef = this.dialog.open(AddNotificationComponent ,{
      data, 
    })

    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getAllNotifications();
        }
      }
    })     
  }
}
