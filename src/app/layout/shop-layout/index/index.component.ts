import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../services/cart.service';
import { CartInventoryComponent } from '../../../shop/cart-inventory/cart-inventory.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  title = 'shopping-cart';
  selected = 'option2';
  IsWait = true;
  constructor(
    private modalService: NgbModal,
    public cs: CartService,
    public dialog: MatDialog,
    private router: Router
  ) { }
  paymentData: any;
  ngOnInit() {
    this.paymentData =JSON.parse(window.localStorage.getItem('paymentData'));
  }
  cartClicked() {
    const dialogRef = this.dialog.open(CartInventoryComponent, {
      width: '700px',
      height: '300px',
      panelClass: 'cart-dialog',
      data: this.paymentData
    });
  }

}
