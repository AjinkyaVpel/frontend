import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConnectorComponent } from './delete-connector/delete-connector.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectorService } from '../apiService/connector.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddConnectorComponent } from './add-connector/add-connector.component';
@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
  stationId!:string;
  chargerId!: string;
  chargerName!:string;
  errorMessage!:string;
  openForm:boolean = false;
  connctorId:any
  displayedColumns: string[] = [ 'id','brands','models','variants'];
  dataSource!: MatTableDataSource<any>;
  
  constructor(private activeRoute: ActivatedRoute,private connectorApi:ConnectorService,  private route:Router,private dialog:MatDialog){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.stationId =params['stationId']; 
      this.chargerId=params['chargerId']; 
    })
    this.activeRoute.queryParams.subscribe(params => {
      this.chargerName = params['chargerName'];
      // Access more data properties as needed
    });

       
        
    this.getConnectorUsingIds(this.stationId,this.chargerId);   
       
  }

  getConnectorUsingIds(stationById: string,chargerById: string){
    this.connectorApi.getConnector(stationById,chargerById).subscribe({
      next: (res:any) => {
        // console.log(res);
        
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
      error: (err:any) => {
        this.errorMessage=err.error.error.message;
      }
    })
  }

  onUpdateConnector(data:any){
    const dialogRef = this.dialog.open(AddConnectorComponent,{
      data, 
    })

    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getConnectorUsingIds(this.stationId,this.chargerId,);
        }
      }
    })                     
    
  }

  onDeleteConnector(connectorId:any){
    //console.warn("delete");
    //this.deleteService.openConfirmDialog()
  
    const dialogRef = this.dialog.open(DeleteConnectorComponent, {

      maxWidth: "400px",

      data: {

        title: "Are you sure?",

        message: "Are you sure you want to delete Connector "

      }

    });

    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {

        this.connectorApi.deleteConnectorById(connectorId).subscribe((result: any) => {
          console.log(result)
        })

      }
      // if user pressed yes dialogResult will be true,

      // if he pressed no - it will be false

      console.log(dialogResult);
      window.location.reload();
   });
  }

  openDialogBox(){
    const dialogRef = new MatDialogConfig();
    dialogRef.data = {
      stationId: this.stationId,
      chargerId: this.chargerId
    };
  
    this.dialog.open(AddConnectorComponent,dialogRef)
    this.getConnectorUsingIds(this.stationId,this.chargerId);

  }

  openConnectorSetting(id: any){
    this.route.navigate([`manageStation/chargers/${this.stationId}/connector/${this.chargerId}/connector-setting`,id])

  }
  
}