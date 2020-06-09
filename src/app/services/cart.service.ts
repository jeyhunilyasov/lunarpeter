import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: any = [];
  constructor() {
    console.log("first???")
    let currentCart = window.localStorage.getItem('cartData');
    if (currentCart) {
      let json = JSON.parse(currentCart);
      this.cartItems = json;
    }
  }

  addCartItem(item) {
    this.cartItems.push(item);
    let currentCart = window.localStorage.getItem('cartData');
    if (currentCart) {
      let json = JSON.parse(currentCart);
      json.push(item);
      window.localStorage.setItem('cartData', JSON.stringify(json));
    } else {
      let json = [];
      json.push(item);
      window.localStorage.setItem('cartData', JSON.stringify(json));
    }
  }
}
