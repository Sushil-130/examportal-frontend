import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) {
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    // tslint:disable-next-line:triple-equals
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !!', '', {
        duration: 3000
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        // alert('success');
        Swal.fire('Success', 'user is registered', 'success');
      },

      (error) => {
        console.log(error);
        // alert('something went wrong');
        this.snack.open('Something went wrong', '',
          {
            duration: 3000,
          });

      });

  }
}

