import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailRegisterComponent } from './components/payment-detail-register/payment-detail-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'PaymentDetailRegister', pathMatch: 'full'},
  { path: 'PaymentDetailRegister', component: PaymentDetailRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
