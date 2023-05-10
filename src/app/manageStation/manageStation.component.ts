import { Component } from '@angular/core';
import { AddStationComponent } from './addStation/addStation.component';
import { OpenDialogComponent } from './openDialog/openDialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StationService } from '../apiService/station.service';
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
  paginator: any;
  sort: any;
  
  ngOnInit(): void {
    this.getStationInfo();
  }

constructor(private manageStation:ManageStationService,  private dialog:MatDialog, private activeRoute:ActivatedRoute, private route: Router, private stationService:StationService){}

  getStationInfo() {                                      // this function calling getMyStation() which is defined
    this.manageStation.getMyStationList().subscribe({        // in myStation service which will get all station and will      
      next: (res: any) => {      
        this.stationData=res;
        // return to this as res 

        this.dataSource = new MatTableDataSource(res); //sending res data into datasource
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // count data of charger from database
        this.dataSource.data = res.map((station: { chargers: any[]; }) => ({
          ...station,
          totalNoOfChargers: station.chargers.length,
          availableChargers: station.chargers.filter((chargers: { active: boolean; }) => chargers.active == true).length,
          inuseChargers: station.chargers.filter((chargers: { active: boolean; }) => chargers.active == false).length,
          outOffOrderChargers: station.chargers.filter((chargers: { active: boolean; }) => chargers.active == false).length

        }));

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

  openChargerList(id: any) {
    this.route.navigate(['manageStation/chargers', id]);
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
}
