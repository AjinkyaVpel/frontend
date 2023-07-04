import { Component, ViewChild } from '@angular/core';
import { AddStationComponent } from './addStation/addStation.component';
import { OpenDialogComponent } from './openDialog/openDialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ManageStationService } from '../apiService/manage-station.service';
import { Station } from './station';


@Component({
  selector: 'app-manage-station',
  templateUrl: './manageStation.component.html',
  styleUrls: ['./manageStation.component.css']
})
export class ManageStationComponent {
  stationData!:Station[];
  dataSource: any;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getStationInfo();
  }

constructor(private manageStation:ManageStationService, private dialog:MatDialog, private activeRoute:ActivatedRoute, private route: Router){}

  getStationInfo() {                                      // this function calling getMyStation() which is defined
    this.manageStation.getMyStationList().subscribe({        // in myStation service which will get all station and will      
      next: (res: any) => {      
        this.stationData=res;
        // return to this as res 

        this.dataSource = new MatTableDataSource(res); //sending res data into datasource
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = res.map((station: { chargers: any[] }) => {
        const totalNoOfChargers = station.chargers.length;
        const availableChargers = station.chargers.filter(charger => charger.active).length;
        const inUseChargers = station.chargers.filter(charger => !charger.active).length;
        const outOffOrderChargers = station.chargers.filter(charger => !charger.active).length;
        
        return {
          ...station,
          totalNoOfChargers,
          availableChargers,
          inUseChargers,
          outOffOrderChargers
        };
      })
    },
      error: (err: any) => {                              // for consoling error
        console.log(err)
      }
    })
  }

  onToggleChange(status: any, id: any): void {          //this function do changes in status field in database when
    if (status == 'Available') {                        //we change the status in website using toggle button
      status = 'Unavailable';
    } else {
      status = 'Available';
    }
    
    this.manageStation.changeStation(status, id).subscribe((result: any) => {
      if (result) {
        this.getStationInfo();                      //for updating the list
      }
    });
  }
  onClickedSetting(stationId: any) {                                //redirect to control access page by sending
    this.route.navigate(['manageStation/controlAccess/', stationId]);  //the id of that specific station
  }

  openChargerList(stationData:any) {
    const data = {
      stationName: stationData.stationName,
      // Add more data properties as needed
    };
    this.route.navigate(['manageStation/chargers', stationData.stationId], { queryParams: data });
  }
  addStationDialog() {
    const dialogRef = this.dialog.open(AddStationComponent)
  }
  
  onDelete(stationId: any) {

    const dialogRef = this.dialog.open(OpenDialogComponent, {

      maxWidth: "400px",

      data: {

        title: "Are you sure?",

        message: "Are you sure you want to delete user "

      }

    });


    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {

        this.manageStation.deleteStationById(stationId).subscribe((result: any) => {
          console.log(result)
          this.getStationInfo();

        })

      }
      // if user pressed yes dialogResult will be true,

      // if he pressed no - it will be false
      
      console.log(dialogResult);
      window.location.reload();
    });
  }
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  onEditStation(data:any){
    const dialogRef = this.dialog.open(AddStationComponent,{
     data  
  }
)}
}
