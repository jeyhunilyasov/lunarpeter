import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPackage: any = 0;
  valueArr: any = [];
  finalAmount: any = 0;
  isPaymentClicked: any = false;
  paymentType: any = '';
  paymentTerms: any = [];
  selectedTerms: any = '';
  isLoading: any = false;
  isOrderLoading: any = false;
  totalPrice: any = 0.00;
  discordName: any = '';
  constructor(
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: CartService,
    private ms: MainService,
    private changeDet: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.totalPackage = Math.ceil(this.cs.cartItems.length / 40);
    this.finalAmount = this.cs.cartItems.length % 40;
    for (let i = 0; i < this.totalPackage; i++) {
      this.valueArr.push(i);
    }
    this.getPaymentTerms();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  viewPaymentDescription(type) {
    this.isPaymentClicked = true;
    //  = type;
    switch (type) {
      case 'paypal':
        this.selectedTerms = this.paymentTerms['Paypal Description'];
        this.paymentType = 'Paypal';
        break;
      case 'apple':
        this.selectedTerms = this.paymentTerms['ApplePay Description'];
        this.paymentType = 'Apple pay';
        break;
      case 'google':
        this.selectedTerms = this.paymentTerms['GooglePay Description'];
        this.paymentType = 'Google pay';
        break;
      case 'bitcoin':
        this.selectedTerms = this.paymentTerms['Bitcoin Description'];
        this.paymentType = 'Bitcoin';
        break;
      default:
        this.selectedTerms = this.paymentTerms['Paypal Description'];
        this.paymentType = 'Paypal';
    }
  }

  getPaymentTerms() {
    this.isLoading = true;
    this.ms.getPaymentTermsAndService().subscribe(
      data => {
        console.log("payment...", data);
        this.paymentTerms = data.data[0];
        this.getTotalPrice();
        this.changeDet.detectChanges();
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  placeOrder() {
    if (!this.discordName) {
      this.toastr.error('Please input your discord name.', 'Error', {
        positionClass: 'toast-top-center'
      });
      return;
    }
    if (this.discordName && this.discordName.length <= 5) {
      this.toastr.error('Incorrect discord name', 'Error', {
        positionClass: 'toast-top-center'
      });
      return;
    }
    if (!this.paymentType) {
      this.toastr.error('Please select payment type', 'Error', {
        positionClass: 'toast-top-center'
      });
      return;
    }
    if (this.checkDiscordNameValidation()) {
      this.isOrderLoading = true;
      let data = {
        discord_name: this.discordName,
        payment_type: this.paymentType,
        data: this.cs.cartItems,
        totalPrice: this.totalPrice
      }
      this.ms.placeOrder(data).subscribe(
        data => {
          if (data.status === 'Success') {
            this.toastr.success('Your order was successfully placed.', 'Success', {
              positionClass: 'toast-top-center'
            });
          }
          this.isOrderLoading = false;
          this.cs.cartItems = [];
          this.onNoClick();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.error('Incorrect discord name', 'Error', {
        positionClass: 'toast-top-center'
      });
    }
  }

  getTotalPrice() {
    if (this.cs.cartItems.length === 0) {
      return 0.00;
    } else {
      let deliveryFee = Math.floor((this.cs.cartItems.length - 1) / 40 + 1) * Number(this.paymentTerms['Delivery Fee']);
      this.totalPrice = this.cs.cartItems.length * Number(this.paymentTerms['Price']) + deliveryFee;
      this.totalPrice = this.totalPrice.toFixed(2);
    }
  }

  checkDiscordNameValidation() {
    if (this.discordName && this.discordName.length > 5) {
      console.log(this.discordName[this.discordName.length - 5]);
      if (this.discordName[this.discordName.length - 5] !== '#') {
        return false;
      }
      let lastFour = this.discordName.substring(this.discordName.length - 4, this.discordName.length);
      console.log(lastFour, Number(lastFour));
      if (isNaN(Number(lastFour))) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
