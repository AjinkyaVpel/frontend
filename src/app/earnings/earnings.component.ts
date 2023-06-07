import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { Earnings } from './earnings';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../apiService/transaction.service';

@Component({
  selector: 'earnings-control',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit{
  hostId!: string;
  earningList!:Earnings[];
  selectedStatus!:string;
  
  displayedColumns: string[] = ['transactionHostId','transactionStationId','transactionDate','transactionTime','transactionStatus','transactionUTR','transactionAmount'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect)
  select!: MatSelect;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private transcationService:TransactionService) {}

  ngOnInit():void{
    this.activeRoute.params.subscribe(params => {
      this.hostId = "HST20230508154106920";
      this.getAllTransactions(this.hostId);      //to get list of bookings by hostId
    })
    
  }
   getAllTransactions(hostId:string){
    this.transcationService.getTransacationsByHostId(hostId).subscribe({
      next:(res: any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
   }

   statusFilter(){
   this.selectedStatus = this.select.value; 
    this.dataSource.filter = this.selectedStatus.trim().toLowerCase();
   }

 
}
