import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConnectorComponent } from './delete-connector/delete-connector.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectorService } from '../apiService/connector.service';
import { DeleteConnectorService } from '../apiService/delete-connector.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddConnectorComponent } from './add-connector/add-connector.component';
@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent {
  stationId: any;
  chargerId: any;
  openForm:boolean = false;

  displayedColumns: string[] = [ 'connectorNumber', 'connectorType','connectorSocket','connectorStatus','connectorOutputPower', 'menu'];
  dataSource!: MatTableDataSource<any>;

  constructor(private activeRoute: ActivatedRoute,private connector:ConnectorService,  private route:Router,private dialog:MatDialog, private deleteService:DeleteConnectorService, ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
        this.stationId = this.activeRoute.snapshot.paramMap.get('stationId');
        this.chargerId = this.activeRoute.snapshot.paramMap.get('chargerId');
        console.warn(this.stationId);
        console.warn(this.chargerId);
        this.getConnectorUsingIds(this.stationId,this.chargerId);
  }

  getConnectorUsingIds(stationById: any,chargerById: any){
    this.connector.getConnector(stationById,chargerById).subscribe({
      next: (res:any) => {
        console.warn(res);
        
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
        console.log(err)
      }
    })
  }

  onUpdateConnector(data: any){
    const dialogRef = this.dialog.open(ConnectorsComponent,{
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getConnectorUsingIds(this.stationId,this.chargerId);
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

        message: "Are you sure you want to delete user "

      }

    });




    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {

        this.connector.deleteConnectorById(connectorId).subscribe((result: any) => {
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
