import { Component, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentDetailForm } from 'src/app/models/paymentdetail';
import { PaymentdetailService } from 'src/app/services/paymentdetail.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @Output("getPaymentDetails") getPaymentDetails: EventEmitter<any> = new EventEmitter();

  formTitle = '';

  dataEdit: any;

  patternNumber = /^-?([0-9]\d*)?$/;

  toastSuccess = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  form: {
    userFormGroup: FormGroup;
    isSubmitted: boolean;
    editMode: boolean;
    errors: any;
  } = {
      userFormGroup: new FormGroup({
        cardOwnerName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(this.patternNumber)]),
        expirationDate: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(`^((0[1-9])|(1[0-2]))/([0-9]{4})$`)]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(this.patternNumber)]),
      }),
      isSubmitted: false,
      editMode: false,
      errors: {}
    };

  constructor(
    private paymentService: PaymentdetailService,
    private dialogRef: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { };

  ngOnInit(): void {
    if (!this.data)
      this.data = { isEdit: false, id: undefined };
    if (this.data.isEdit == true && this.data.id != undefined) {
      this.form.editMode = true;
      this.formTitle = 'Edit Payment Detail';
      this.paymentService.getPaymentDetailById(this.data.id).subscribe(res => {
        this.dataEdit = res['result'];
        this.form.userFormGroup.patchValue({
          cardOwnerName: this.dataEdit.cardOwnerName,
          cardNumber: this.dataEdit.cardNumber,
          expirationDate: this.dataEdit.expirationDate,
          securityCode: this.dataEdit.securityCode,
        });
      });
    } else {
      this.formTitle = 'Payment Detail Register';
    }

  };

  //Getter for form spesific value
  get cardOwnerName() {
    return this.form.userFormGroup.get('cardOwnerName');
  };

  get cardNumber() {
    return this.form.userFormGroup.get('cardNumber');
  };

  get expirationDate() {
    return this.form.userFormGroup.get('expirationDate');
  };

  get securityCode() {
    return this.form.userFormGroup.get('securityCode');
  };

  //Push error & Delete error from array object in form
  validateForm() {
    if (this.cardOwnerName?.errors)
      this.form.errors.cardOwnerName = { ...this.cardOwnerName?.errors }
    else
      delete this.form.errors.cardOwnerName
    if (this.cardNumber?.errors)
      this.form.errors.cardNumber = { ...this.cardNumber?.errors }
    else
      delete this.form.errors.cardNumber
    if (this.expirationDate?.errors)
      this.form.errors.expirationDate = { ...this.expirationDate?.errors }
    else
      delete this.form.errors.expirationDate
    if (this.securityCode?.errors)
      this.form.errors.securityCode = { ...this.securityCode?.errors }
    else
      delete this.form.errors.securityCode
  };

  //Handle event submit form
  onSubmit() {
    this.switchSubmittedState(true);
    this.validateForm();

    if (Object.keys(this.form.errors).length === 0) {
      const paymentForm: PaymentDetailForm = {
        cardOwnerName: this.form.userFormGroup.value.cardOwnerName,
        cardNumber: this.form.userFormGroup.value.cardNumber,
        expirationDate: this.form.userFormGroup.value.expirationDate,
        securityCode: this.form.userFormGroup.value.securityCode,
      };
      if (this.form.editMode == true) {
        this.paymentService.putPaymentDetailById(this.data.id, paymentForm).subscribe(
          (res) => {
            if (res) {
              this.toastSuccess.fire({
                icon: 'success',
                title: 'Data edited'
              })
              this.form.userFormGroup.reset();
              this.dialogRef.closeAll();
            }
          },
          (err) => {
            this.toastSuccess.fire({
              icon: 'error',
              title: err
            })
          },
        );
      } else {
        this.paymentService.postPaymentDetail(paymentForm).subscribe(
          (res) => {
            if (res) {
              this.toastSuccess.fire({
                icon: 'success',
                title: 'Data recorded'
              })
              this.form.userFormGroup.reset();
              this.getPaymentDetails.emit();
            }
          },
          (err) => {
            this.toastSuccess.fire({
              icon: 'error',
              title: err
            })
          },
        );
      }

    }
  };

  //Change submitted form state
  switchSubmittedState(state: boolean) {
    this.form.isSubmitted = state;
  };

}
