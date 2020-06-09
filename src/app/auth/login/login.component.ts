import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: any = '';
  isLoadding: any = false;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.isLoadding = true;
      this.auth.login(this.password).subscribe(
        data => {
          if (data.status === 'Success') {
            this.toastr.success(data.data, 'Success', {
              positionClass: 'toast-top-center'
            });
            window.localStorage.setItem('isDodoUserAuthorized', "true");
            this.isLoadding = false;
            this.router.navigateByUrl('/shop');
          } else {
            this.toastr.error(data.data, 'Error', {
              positionClass: 'toast-top-center'
            });
            this.isLoadding = false;
          }
        }
      )
    }
  }

}
