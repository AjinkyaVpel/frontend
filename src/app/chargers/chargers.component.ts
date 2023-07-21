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
import { Charger } from './charger';
@Component({
  selector: 'app-chargers',
  templateUrl: './chargers.component.html',
  styleUrls: ['./chargers.component.css']
})
export class ChargersComponent implements OnInit {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
  stationId!: string;
  stationName!: string;
  chargerListData: any;
  selectedItem: any;
  errorMessage!:string;
  allSelected:any
  chargerName!: string;

  
  constructor(private activeRoute:ActivatedRoute,private chargerApi:ChargerService, private myStation:ChargerService,private route:Router, private dialog:MatDialog, private snackBar:MatSnackBar) {}

  displayedColumns: string[] = ['id', 'chargerName', 'chargerPointSerialNumber','connectorStatus','total','activeConnector','inactiveconnector','chargerStatus', 'menu'];
  dataSource!: MatTableDataSource<any>;
 
                                 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.stationId =params['stationId'];    
      this.getChargerListById(this.stationId);     
       //to get the charger list of particular station using charger service
     })

     this.activeRoute.queryParams.subscribe(params => {
       this.stationName = params['stationName'];
      // Access more data properties as needed
      console.log(this.stationName); 
    });
  }

  getChargerListById(id: string) {
    this.chargerApi.getChargerAllList(id).subscribe({
      next: (res:any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        // counting the connectors
        // this.dataSource.data = res.map((charger: {connectors: any [];}) => ({
        //   ...charger,
        //   totalConnectors: charger.connectors.length,
        //   activeConnectors: charger.connectors.filter((connectors: {active:boolean; }) => connectors.active == true).length,
        //   inactiveConnectors: charger.connectors.filter((connectors: {active:boolean; }) => connectors.active == false).length
          
        // }));
        this.dataSource.data = res.map((charger: { connectors: any[] }) => {
          const totalConnectors = charger.connectors.length;
          const activeConnectors = charger.connectors.filter(connectors => connectors.active).length;
          const inactiveConnectors = charger.connectors.filter(connectors => !connectors.active).length;
          return {
            ...charger,
            totalConnectors,
            activeConnectors,
            inactiveConnectors,
          };
        })
       
      },
      error: (err:any) => {
        this.openSnackBar(err.error.error.message)
        this.errorMessage=err.error.error.message;
      }
    })
  }

  // redirecting to connector page 
  openConnector(chargerData: Charger){
    const data = {
      chargerName: chargerData.chargerName,
      // Add more data properties as needed
    };
    this.route.navigate([`manageStation/chargers/${this.stationId}/connector/${chargerData.chargerId}`],{ queryParams: data });
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

        message: "Are you sure you want to delete Charger "

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
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  toggleBulkSelection() {
    this.dataSource.data.forEach((row: any) => {
      row.selected = !row.selected;
    });
  }
 
}
