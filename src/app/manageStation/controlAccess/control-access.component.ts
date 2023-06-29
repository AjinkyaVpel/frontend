import { Component, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageStationService } from 'src/app/apiService/manage-station.service';
import { Station } from '../station';
import { MatDialog } from '@angular/material/dialog';
import { RestrictedAccessComponent } from '../restrictedAccess/restricted-access.component';
import { RestrictedAccessService } from 'src/app/apiService/restricted-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-control-access',
  templateUrl: './control-access.component.html',
  styleUrls: ['./control-access.component.css']
})
export class ControlAccessComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
  dialogRef: any;
  dialog: any;
  stationId!: string;
  myStationData: Station=new Station();
  apiAmenities: string[] = [];
  userList:string[]=[];
  tableIsEmpty:boolean=false;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'userName', 'email','contact','city','state', 'menu'];

  constructor(private route: Router,private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private restrictedAccessApi:RestrictedAccessService,private myStation: ManageStationService, private dailog:MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.stationId = params['id'];
      this.getMyStationUsingId(this.stationId);
      this.getUsersbyStationId(this.stationId);
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


  getUsersbyStationId(stationId:string){
    this.restrictedAccessApi.getRestrictedUsersByStationId(stationId).subscribe((res)=>{
      
      this.userList=JSON.parse(res);
      if(this.userList.length===0){
        this.tableIsEmpty=true;
      }
      else{
      this.getUsersDetailsByListOfUserIds(this.userList);
      }
    },( err: HttpErrorResponse)=>{
      console.log(err)
      this.tableIsEmpty=true;
    }
    
    )}


    getUsersDetailsByListOfUserIds(listOfUsers:string[]){
      this.restrictedAccessApi.getUsersDetailsByListOfIds(listOfUsers).subscribe({
        next: (res:any) => {
          console.log(res)
          
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  deleteUserFromRestrictedAccessList(userId:string){
    
    this.restrictedAccessApi.deleteUserFromRestrictedAccess(this.stationId,userId).subscribe((res)=>{
      console.log(res)
        window.location.reload();

    },(err)=>{
      
      window.location.reload();
    })

  }
  
}
