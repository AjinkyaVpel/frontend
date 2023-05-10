import { Component, ViewChild,OnInit } from '@angular/core';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargerService } from '../apiService/charger.service';
import { DeleteDialogComponent } from './deleteDialog/delete-dialog.component';
import { AddChargerComponent } from './addCharger/addCharger.component';

@Component({
  selector: 'app-chargers',
  templateUrl: './chargers.component.html',
  styleUrls: ['./chargers.component.css']
})
export class ChargersComponent implements OnInit {
  stationId: any;
  stationName: any;
  chargerListData: any;
  selectedItem: any;
  errorMessage!:string;
  

  constructor(private activeRoute:ActivatedRoute,private charger:ChargerService, private myStation:ChargerService,private route:Router, private dialog:MatDialog, private snackBar:MatSnackBar) {}

  displayedColumns: string[] = ['id', 'chargerName', 'chargerserialNumber','connectorStatus','total','activeConnector','inactiveconnector','chargerStatus', 'menu'];
  dataSource!: MatTableDataSource<any>;
  totalConnectors: number = 0;
  activeConnectors: number = 0;
  inactiveConnectors: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.stationId =params['stationId'];    
      this.getChargerListById(this.stationId);      //to get the charger list of particular station using charger service

     })
  }

  getChargerListById(id: any) {
    this.charger.getChargerAllList(id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        // counting the connectors
        this.dataSource.data = res.map((charger: {connectors: any [];}) => ({
          ...charger,
          totalConnectors: charger.connectors.length,
          activeConnectors: charger.connectors.filter((connectors: {active:boolean; }) => connectors.active == true).length,
          inactiveConnectors: charger.connectors.filter((connectors: {active:boolean; }) => connectors.active == false).length

        }));
        
      },
      error: (err) => {
        this.openSnackBar(err.error.error.message)
        this.errorMessage=err.error.error.message;
      }
    })
  }

  // redirecting to connector page 
  openConnector(chargerId: any){
    this.route.navigate([`manageStation/chargers/${this.stationId}/connector`,chargerId]);
  }

  // open charger setting page
  openChargerSetting(data: any){
    this.route.navigate([`manageStation/chargers/${this.stationId}/chargerSetting/`,data.chargerId]);
  }
  addChargerDialog(){
      const dialogRef = new MatDialogConfig();
      dialogRef.data = {
        stationId: this.stationId,
      };
      this.dialog.open(AddChargerComponent,dialogRef)
    }
  
    
  onRemove(chargerId:any){
   // this.boxService.openConfirmDialog()
   

    const dialogRef = this.dialog.open(DeleteDialogComponent, {

      maxWidth: "400px",

      data: {

        title: "Are you sure?",

        message: "Are you sure you want to delete user "

      }

    });




    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {

        this.myStation.deleteChargerById(chargerId).subscribe((result: any) => {
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
  getStationInfo() {
    throw new Error('Method not implemented.');
  }


  openSnackBar(message: any,action: any = 'ok') {
    this.snackBar.open(message,action, {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['warning']
      
    });
  }
  
}
