import { Component, ViewChild } from '@angular/core';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {
  dataSource!: MatTableDataSource<any>;
 

  constructor(private dialog:MatDialog){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 addVehicleDialog(){
  const dialogRef=this.dialog.open(AddVehicleComponent,{width:'400px'})
 }
}
