import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from 'src/app/apiService/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from './booking';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends


  hostId!: string;
  bookingList!: Booking[];
  selectedStatus!:string;
  openSearch: boolean = false;
  displayedColumns: string[] = ['hostId','stationName', 'chargerId', 'bookingSocket', 'bookingDate', 'bookingTime', 'bookingCancellationReason', 'bookingStatus', 'bookingAmount'];
  dataSource!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect)
  select!: MatSelect;



  constructor(private router:Router,private activeRoute: ActivatedRoute, private bookingApi: BookingService) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      // this.hostId =params['hostId']; 
      // to be replaced with actual host id
      this.hostId = "HST20230508154106920";
      this.getBookingByHostId(this.hostId);      //to get list of bookings by hostId

    })
    

  }
  getBookingByHostId(hostId: string) {
    this.bookingApi.getBookingByHostId(hostId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.bookingList = res;
        // console.log(this.bookingList);
        this.dataSource = new MatTableDataSource(this.bookingList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  openSearchBar() {
    this.openSearch = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


 statusFilter(){
   this.selectedStatus = this.select.value; 
  this.dataSource.filter = this.selectedStatus.trim().toLowerCase();
 }
 
 onClickedStation(stationId: any) {                                //redirect to control access page by sending
    this.router.navigate(['manageStation/controlAccess/', stationId]);  //the id of that specific station
    
  }                      


}