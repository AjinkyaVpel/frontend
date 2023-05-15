import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../apiService/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Booking } from './booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  hostId!: string;
  bookingList!: Booking[];


  constructor(private activeRoute: ActivatedRoute, private bookingApi: BookingService) { }
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

  openSearch: boolean = false;
  displayedColumns: string[] = ['hostId','stationName', 'chargerId', 'bookingSocket', 'bookingDate', 'bookingTime', 'bookingCancellationReason', 'bookingStatus', 'bookingAmount'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openSearchBar() {
    this.openSearch = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


