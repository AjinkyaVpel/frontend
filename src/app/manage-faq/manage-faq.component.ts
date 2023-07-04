import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageFaqService } from '../apiService/manage-faq.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddFaqDailogComponent } from './add-faq-dailog/add-faq-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageFaq } from './manage-faq';
import { DeleteFaqComponent } from './delete-faq/delete-faq.component';
import { ViewFaqDetailsComponent } from './view-faq-details/view-faq-details.component';

@Component({
  selector: 'app-manage-faq',
  templateUrl: './manage-faq.component.html',
  styleUrls: ['./manage-faq.component.css']
})
export class ManageFaqComponent implements OnInit {

  dataSource!: MatTableDataSource<ManageFaq>;
  displayedColumns: string[] = ['faqId', 'faqCategory', 'faqSeqNumber', 'faqQuestion', 'faqAnswer', 'menu'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private activeRoute: ActivatedRoute, private route: Router, private faqApi: ManageFaqService, private dialog: MatDialog,) {

  }
  ngOnInit(): void {
    this.getAllFaq();
  }

  getAllFaq() {
    this.faqApi.getAllFaqList().subscribe({
      next: (res: any) => {

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  addFaqDailog() {
    const dialogRef = this.dialog.open(AddFaqDailogComponent, { width: '600px', data: {} });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {

      }
    });
  }


  onEditFaq(data: any) {
    const dialogRef = this.dialog.open(AddFaqDailogComponent, {
      width: '600px',
      data
    })

    dialogRef.afterClosed().subscribe({

      next: (val: any) => {

        if (val) {

          this.getAllFaq();

        }

      }

    });

  }

  onDeleteFaq(faqId: string) {
    const dialogRef = this.dialog.open(DeleteFaqComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: "Are you sure want to delete FAQ? "
      }

    });

    // listen to response

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      console.log(dialogResult);
      if (dialogResult) {
        this.faqApi.deleteFaqById(faqId).subscribe((result: any) => {
        })
      }
      window.location.reload();

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showFaqDetails(data: any) {
    const dialogRef = this.dialog.open(ViewFaqDetailsComponent, { maxWidth: "600px", 
      data
     });
  }




}

