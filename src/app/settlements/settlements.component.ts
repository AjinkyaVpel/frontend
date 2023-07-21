import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettlementService } from '../apiService/settlement.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
    
  stationId:any;
  openSearch:boolean = false;
  completed:boolean = false;
  pending:boolean = false;
  rejected:boolean = false;
  dataSource!: MatTableDataSource<any>;
  hostId!:string;
  selectedStatus!: string;
selectedValue !: string;
  constructor(private settlementApi:SettlementService,private route:ActivatedRoute, private formbuilder:FormBuilder){  }
  displayedColumns: string[] = [ 'srNo', 'settlementId','settlementAmount','settlementStatus','settlementDate', 'settlementUTR'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect)
  select!: MatSelect;
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      //const hostId = params['hostId'];
      this.hostId="HST20230518045359411";
      this.getSettlementUsingId(this.hostId);
    });
   
   
}
 
  openSearchBar(){
  this.openSearch = !this.openSearch;
  }
  getSettlementUsingId(hostId:any){
  this.settlementApi.getSettlement(hostId).subscribe({
    next: (res:any) => {
     // console.warn(res);
      
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   },
   error: (err) => {
    console.log(err);
  } })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
applyFilters() {
  const selectedValue = this.select.value;
  this.dataSource.filter = selectedValue.trim().toLowerCase();
}

}
