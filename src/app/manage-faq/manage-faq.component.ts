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
  displayedColumns: string[] = ['faqId', 'faqCategory', 'faqSeqNumber', 'faqQuestion', 'menu'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activeRoute: ActivatedRoute, private route: Router, private faqApi: ManageFaqService, private dialog: MatDialog,) {

  }
  ngOnInit(): void {
    this.getAllFaq();
  }

  getAllFaq() {
    this.faqApi.getAllFaqList().subscribe({
      next: (res: ManageFaq[]) => {
        console.log(res);

        res.sort((a, b) => {
          // Compare the category
          if (a.faqCategory !== b.faqCategory) {
            return a.faqCategory.localeCompare(b.faqCategory);
          }
    
          const seqNumberA = a.faqSeqNumber.toString();
          const seqNumberB = b.faqSeqNumber.toString();
    
          // Split the sequence numbers into integer and decimal parts
          const [intA, decA] = seqNumberA.split('.').map(parseFloat);
          const [intB, decB] = seqNumberB.split('.').map(parseFloat);
    
          // Compare the integer parts
          if (intA !== intB) {
            return intA - intB;
          }
    
          // Compare the decimal parts if they exist
          if (!Number.isNaN(decA) && !Number.isNaN(decB)) {
            return decA - decB;
          }
    
          // Handle the case where one sequence number is an integer and the other is a decimal
          if (Number.isNaN(decA)) {
            return -1;
          } else if (Number.isNaN(decB)) {
            return 1;
          }
    
          return 0; // The sequence numbers are equal within the same category
        });
    
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)

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

