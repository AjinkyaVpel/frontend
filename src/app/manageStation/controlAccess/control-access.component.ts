import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageStationService } from 'src/app/apiService/manage-station.service';
import { Station } from '../station';
import { MatDialog } from '@angular/material/dialog';
import { RestrictedAccessComponent } from '../restrictedAccess/restricted-access.component';


@Component({
  selector: 'app-control-access',
  templateUrl: './control-access.component.html',
  styleUrls: ['./control-access.component.css']
})
export class ControlAccessComponent {
  
  dialogRef: any;
  dialog: any;
  stationId: any;
  myStationData!: Station;
  apiAmenities: string[] = [];

  constructor(private route: Router,private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private myStation: ManageStationService, private dailog:MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.stationId = params['id'];
      this.getMyStationUsingId(this.stationId);
    })
  }

  onRemove(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openChargerSetting(_t197: any) {
    throw new Error('Method not implemented.');
  }
  // get station details by stationId 
  getMyStationUsingId(id: string) {
    this.myStation.getStationById(id).subscribe((result) => {
      this.myStationData = result;
      this.apiAmenities = this.myStationData.stationAmenity;
    })
  }
  // openConnector(chargerId: any) {
  //   this.route.navigate([`manageStation/chargers/${this.stationId}/connector`, chargerId]);
  // }

  restrictedAccess(){
    // this.route.navigate([`manageStation/controlAccess/${this.stationId}/addRestrictions`]);

  }

  openPopup(){
    this.dailog.open(RestrictedAccessComponent,
      {width:'60%',enterAnimationDuration:'500ms',height:'400px',data:{
        stationId:this.stationId
      }})
  }
  
}
