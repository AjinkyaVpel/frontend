import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettlementService } from '../apiService/settlement.service';
import { ActivatedRoute } from '@angular/router';
import { Settlement } from './settlement';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css']
})
export class SettlementsComponent {
  stationId:any
  openSearch:boolean = false;
  completed:boolean = false;
  pending:boolean = false;
  rejected:boolean = false;
  dataSource!: MatTableDataSource<any>;
  settlementData!:Settlement[];
  hostId!:string;
  selectedStatus!: string;
  constructor(private settlementApi:SettlementService,private route:ActivatedRoute, private formbuilder:FormBuilder){  }
  displayedColumns: string[] = [ 'srNo', 'settlementId','settlementAmount','settlementStatus','settlementDate', 'settlementUTR'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      //const hostId = params['hostId'];
      this.hostId="HST20230508154106920";
      this.getSettlementUsingId(this.hostId);
    });
    this.dataSource.filterPredicate = (row, filter) => {
      const status = filter as string;
      return this.statusFilterPredicate(row, status);
    };
    
    this.dataSource.filter = this.selectedStatus;
   
}
 
  openSearchBar(){
  this.openSearch = !this.openSearch;
  }
  getSettlementUsingId(hostId:any){
  this.settlementApi.getSettlement(hostId).subscribe({
    next: (res:any) => {
      this.settlementData=res;
     // console.warn(res);
      
      this.dataSource = new MatTableDataSource(this.settlementData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   },
   error: (err) => {
    console.log(err)
  } })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
statusFilterPredicate(row: any, status: string): boolean {
  return row.settlementStatus === status;
}

}
