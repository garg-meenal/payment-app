import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumPaymentRoutingModule } from './premium-payment-routing.module';
import { PremiumPaymentComponent } from './premium-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PremiumPaymentComponent
  ],
  imports: [
    CommonModule,
    PremiumPaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PremiumPaymentModule { }
