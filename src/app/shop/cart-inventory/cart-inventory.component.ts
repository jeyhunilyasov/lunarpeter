import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-inventory',
  templateUrl: './cart-inventory.component.html',
  styleUrls: ['./cart-inventory.component.scss']
})
export class CartInventoryComponent implements OnInit {
  currentData: any = [];
  currentPageIndex: any = 1;
  isNextAvailable: any = false;
  totalPrice: any = 0.00;
  constructor(
    public dialogRef: MatDialogRef<CartInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: CartService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentPageIndex = 1;
    this.getCurrentData(this.currentPageIndex);
    this.getTotalPrice();
    console.log("data in cart", this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCurrentData(pageNum) {
    this.currentData = [];
    if (this.cs.cartItems.length > 40 * pageNum) {
      let firstIndex = (pageNum - 1) * 40 + 1;
      let lastIndex = firstIndex + 40;
      this.currentData = this.cs.cartItems.slice(firstIndex, lastIndex);
      this.isNextAvailable = true;
    } else {
      let firstIndex = 0
      if (this.cs.cartItems.length > 40) {
        firstIndex = (pageNum - 1) * 40;
      }
      let lastIndex = this.cs.cartItems.length;
      this.currentData = this.cs.cartItems.slice(firstIndex, lastIndex);
      console.log("current Data -->", this.currentData);
      this.isNextAvailable = false;
    }
  }

  gotoCheckout() {
    this.onNoClick();
    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '500px',
      // height: '250px',
      panelClass: 'checkout'
      // data: list
    });
  }

  emptyCart() {
    this.cs.cartItems = [];
    window.localStorage.removeItem('cartData');
    this.toastr.success('All cart items removed.');
  }

  gotoNextPage() {
    this.currentPageIndex++;
    this.getCurrentData(this.currentPageIndex);
  }

  gotoPreviousPage() {
    this.currentPageIndex--;
    this.getCurrentData(this.currentPageIndex);
  }

  getTotalPrice() {
    if (this.cs.cartItems.length === 0) {
      return 0.00;
    } else {
      let deliveryFee = Math.floor((this.cs.cartItems.length - 1) / 40 + 1) * Number(this.data['Delivery Fee']);
      this.totalPrice = this.cs.cartItems.length * Number(this.data['Price']) + deliveryFee;
      this.totalPrice = this.totalPrice.toFixed(2);
    }
  }
}
