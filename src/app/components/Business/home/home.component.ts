import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../client_side_services/user.service.client"
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  loggedIn: boolean;

  ngOnInit() {
  	this.isLoggedIn();
  }

  isLoggedIn() {
  	this.userService.publicLoggedIn().subscribe(
  		(isLoggedIn) => {
  			this.loggedIn = isLoggedIn;
  		}	
  	);
  }

  logout() {
		this.userService.logout().subscribe(
			(status) => {
				this.router.navigate(['/']);
			}
		);
	}

}