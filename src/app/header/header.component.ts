import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
    
    @Input() collapsed = false;
    @Input() screenWidth = 0;
       
    getHeadClass():string {
      let styleClass = '';
      if(this.collapsed && this.screenWidth > 768){
        styleClass = 'head-trimmed';
      }else{
        styleClass = 'head-md-screen'
      }
      return styleClass;  
    }
    constructor(private dialog: MatDialog) { }
    openNotificationDialog(): void {
      this.dialog.open(NotificationDialogComponent);
    }
}
