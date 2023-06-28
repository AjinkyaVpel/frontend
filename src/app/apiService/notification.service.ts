import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }
//Get All Notification
  getNotification(){
    return this.http.get(`http://192.168.0.243:8093/manageNotification/notifications`)
 }
 getNotificationById(notificationId: string) {
  console.log(notificationId)

  return this.http.get<Notification>(`http://192.168.0.243:8093/manageNotification/notification?notificationId=${notificationId}`);
}
 addNotificationToList(data:any){
    
 
    return this.http.post(`http://192.168.0.243:8093/manageNotification/addNotification`,data).subscribe(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.log('Error', error.status);
      }
    )  
  }
  deleteNotificationById(notificationId:any){
    return this.http.delete(`http://192.168.0.243:8093/manageNotification/deleteNotification?notificationId=${notificationId}`);
  }
  updateNotification(notificationId:any,data:any){
    return this.http.put(`http://192.168.0.243:8093/manageNotification/updateNotification?notificationId=${notificationId}`,data)
  }
}
