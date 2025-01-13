import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiumPaymentComponent } from './premium-payment.component';

const routes: Routes = [{ path: '', component: PremiumPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumPaymentRoutingModule { }
