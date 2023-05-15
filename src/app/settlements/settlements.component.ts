import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  displayedColumns: string[] = [ 'srNo', 'settlementId','amount','settlementStatus','paymentDate', 'utrNo'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openSearchBar(){
    this.openSearch = !this.openSearch;
  }
}
