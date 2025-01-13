import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-premium-payment',
  standalone: false,
  
  templateUrl: './premium-payment.component.html',
  styleUrl: './premium-payment.component.scss'
})
export class PremiumPaymentComponent{
  paymentForm: FormGroup;
  paymentSuccess: boolean | null = null;
  isPolicyDetailsAvailable = false;
  policyDetails: any = null;
  premiumAmount = 0;
  private worker : Worker | null = null;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(\\d{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardHolderName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment Details:', this.paymentForm.value);
      this.paymentSuccess = true;
      alert('Payment successful!');
    } else {
      this.paymentSuccess = false;
      alert('Please fill in the form correctly.');
    }
  }

  getPolicyDetails(){
    this.isPolicyDetailsAvailable = true;
    const policyData = localStorage.getItem('policyData');
    if (policyData) {
      this.policyDetails = JSON.parse(policyData);
      const workerScript = this.getPremiumScript();
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));
      this.worker.onmessage = (event) => {
        this.premiumAmount = event.data;
      };

       this.worker.postMessage(this.policyDetails);
    }
  }

  private getPremiumScript(): string{
    return `
      self.onmessage = function(event) {
        const policy = event.data;
        let premium = 0;
        const policyNo = policy.policyNumber;
        if(policyNo === 'HS12345'){
          premium = 12000;
        }else if(policyNo === 'HS12346'){
          premium = 13000;
        }
        self.postMessage(premium);
      };
    `;
  }
}
