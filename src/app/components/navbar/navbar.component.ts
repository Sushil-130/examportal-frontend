import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private login: LoginService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.login.logout();
    window.location.reload();
  }
}
