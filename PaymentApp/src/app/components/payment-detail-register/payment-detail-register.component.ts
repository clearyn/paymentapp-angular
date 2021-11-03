import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentDetail, PaymentDetailForm } from 'src/app/models/paymentdetail';
import { PaymentdetailService } from 'src/app/services/paymentdetail.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
@Component({
  selector: 'app-payment-detail-register',
  templateUrl: './payment-detail-register.component.html',
  styleUrls: ['./payment-detail-register.component.css']
})
export class PaymentDetailRegisterComponent implements OnInit {
  displayedColumns: string[] = ['cardOwnerName', 'cardNumber', 'expirationDate', 'action'];
  dataSource: MatTableDataSource<PaymentDetail> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(private paymentService: PaymentdetailService, public dialog: MatDialog) {
  }

  getPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe(dataSource => {
      this.dataSource = new MatTableDataSource(dataSource['result']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  };

  ngOnInit() {
    this.getPaymentDetails();
  }

  applyFilter(filterValue: KeyboardEvent | '' = '') {
    let input = filterValue ? (filterValue.target as HTMLInputElement).value : '';
    this.dataSource.filter = input.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRequest(id: number) {
    Swal.fire({
      title: `Do you want to delete id: ${id}`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
      showLoaderOnConfirm: true,
      allowEscapeKey: false,
      preConfirm: (login) => {
        return this.getDeleteUserById(id);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('Delete Cancelled', '', 'info')
      }
    })
  }

  getDeleteUserById(id: number): boolean {
    this.paymentService.deletePaymentDetailById(id).subscribe(
      (res) => {
        if (res['success'] == true) {
          Swal.fire(res['message'][0], '', 'success')
          this.getPaymentDetails();
        } else {
          alert('Unknown Error');
        }
      },
      (err) => {
        Swal.fire(err, '', 'info');
      },
    );
    return true;
  };

  openForm(isEdit: boolean = false, id?: number) {
    const dialogReactive = this.dialog.open(PaymentFormComponent, { data: { isEdit: isEdit, id: id } });
    dialogReactive.afterClosed().subscribe(result => {
      this.getPaymentDetails();
    });
  }

}
