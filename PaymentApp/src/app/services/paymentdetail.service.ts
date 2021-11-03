import { Injectable } from '@angular/core';
import { PaymentDetailForm } from '../models/paymentdetail';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentdetailService {
  endpoint: string = 'https://paymentapi-003.herokuapp.com/api/PaymentDetail';

  constructor(private http: HttpClient) { }

  // GET
  getPaymentDetails(): Observable<any>{
    let api = `${this.endpoint}`;
    return this.http
      .get(api)
      .pipe(catchError(this.handleError));
  }

  // GET: id
  getPaymentDetailById(id: Number): Observable<any> {
    let api = `${this.endpoint}/${id}`;
    return this.http
      .get(api)
      .pipe(catchError(this.handleError));
  }

  // POST
  postPaymentDetail(PaymentDetailForm: PaymentDetailForm):  Observable<any> {
    let api = `${this.endpoint}`;
    return this.http
      .post(api, PaymentDetailForm)
      .pipe(catchError(this.handleError));
  }

  // PUT: id
  putPaymentDetailById(id: Number, PaymentDetailForm: PaymentDetailForm): Observable<any> {
    let api = `${this.endpoint}/${id}`;
    return this.http
      .put(api, PaymentDetailForm)
      .pipe(catchError(this.handleError));
  }

  // DELETE: id
  deletePaymentDetailById(id: Number) : Observable<any> {
    let api = `${this.endpoint}/${id}`;
    return this.http
      .delete(api)
      .pipe(catchError(this.handleError));
  }

  // Error Handling
  handleError (e: HttpErrorResponse){
    let msg = '';
    if (e.error instanceof ErrorEvent) {
      msg = e.error.message;
    }else{
      msg = `Error Code: ${e.status}\n Message: ${e.message}`;
    }
    return throwError(msg);
  };

}
