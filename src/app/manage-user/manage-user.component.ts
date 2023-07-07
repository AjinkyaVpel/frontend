import { Component, ViewChild } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  selectedStatus!:string;

  displayedColumns: string[] = [ 'hostFirstName', 'hostLastName','hostEmail','role','status','menu'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect)
  select!: MatSelect;

  constructor(private dialog:MatDialog){}



  addUserDailog() {
    const dialogRef = this.dialog.open(AddUserComponent, { width: '600px', data: {} });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {

      }
    });
  }

  statusFilter(){
    this.selectedStatus = this.select.value; 
     this.dataSource.filter = this.selectedStatus.trim().toLowerCase();
    }
 

 


}
