import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  currentItem: any;
  focusedItem: any;
  isMouseOver = false;
  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cs: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentItem = this.data.list.data[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCapitalizedName() {
    let newName = ''
    if (this.data.list.name) {
      newName = this.data.list.name[0].toUpperCase() + this.data.list.name.substring(2, this.data.list.name.length);
    }
    return newName;
  }

  imageMouseOver(item) {
    this.focusedItem = item;
    this.isMouseOver = true;
  }

  imageMouseClick(item) {
    this.currentItem = item;
  }

  isActiveImage(item) {

  }

  getImage(list) {
    let image = '';
    if (list.Image) {
      image = list.Image;
    } else {
      if (list['Closet Image']) {
        image = list['Closet Image'];
      } else {
        if (list['Inventory Image']) {
          image = list['Inventory Image'];
        } else {
          this.data.data.forEach(ele => {
            if (ele.Image) {
              image = ele.Image;
            }
          });
          if (!image) {
            this.data.data.forEach(ele => {
              image = ele['Closet Image'];
            })
          }
          if (!image) {
            this.data.data.forEach(ele => {
              image = ele['Inventory Image'];
            });
          }
        }
      }
    }
    return image;
  }

  addItemToCart() {
    this.cs.addCartItem(this.currentItem);
    // this.cs.cartItems.push(this.currentItem);
    this.toastr.success('Added to Cart!', 'Success', {
      positionClass: 'toast-top-center'
    });
  }

  addAllToCart() {
    if (this.data.list.data.length > 0) {
      this.data.list.data.forEach(ele => {
        this.cs.addCartItem(ele);
        // this.cs.cartItems.push(ele);
      });
      this.toastr.success('Added to Cart!', 'Success', {
        positionClass: 'toast-top-center'
      });
    }
  }
}
