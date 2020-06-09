import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './services/cart.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';
  selected = 'option2';
  IsWait = true;
  constructor(
    private modalService: NgbModal,
    public cs: CartService,
    public dialog: MatDialog,
    private router: Router
  )
  {}

  ngOnInit() {
    console.log(this.router.url);
  }
}
