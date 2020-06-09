
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule} from '@angular/forms'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

import { ShopLayoutRoutingModule } from './shop-layout-routing.module';
import { IndexComponent } from './index/index.component';
import { CartInventoryComponent } from '../../shop/cart-inventory/cart-inventory.component';
import { CheckoutComponent } from '../../shop/checkout/checkout.component'
@NgModule({
  declarations: [IndexComponent, CartInventoryComponent, CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShopLayoutRoutingModule,
    MaterialModule,
  ],
  entryComponents: [CartInventoryComponent, CheckoutComponent]
})
export class ShopLayoutModule { }
