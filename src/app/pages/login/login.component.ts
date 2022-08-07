import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    username: '',
    password: ''

  };

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  formSubmit() {
    console.log('login bt clicked');

    // tslint:disable-next-line:triple-equals
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required', '', {
        duration: 3000,
      });
      return;
    }
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            // tslint:disable-next-line:triple-equals
            if (this.login.getUserRole() == 'ADMIN') {
              this.router.navigate(['/', 'admin']);
              // tslint:disable-next-line:triple-equals
            } else if (this.login.getUserRole() == 'NORMAL') {
              this.router.navigate(['/', 'user-dashboard']);
            } else {
              this.login.logout();
            }

          }
        );
      },
      (error) => {
        console.log(error);
        console.log('Error');
      }
    );

  }
}
