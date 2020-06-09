import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInventoryComponent } from './cart-inventory.component';

describe('CartInventoryComponent', () => {
  let component: CartInventoryComponent;
  let fixture: ComponentFixture<CartInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
