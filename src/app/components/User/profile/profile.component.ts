import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../client_side_services/user.service.client'
import { User } from '../../../models/user.model.client'
import { SharedService } from '../../../client_side_services/shared.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@ViewChild('f') profileForm: NgForm;

	uid: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	dob: string;
	gender: string;
	country: string;
	state: string;
	city: string;
	phone: string;
	email: string;
	prefPhone: boolean;
	prefEmail: boolean;
	idNum?: string;
	idType?: string;
	idDate?: string;
	idCountry?: string;
	idState?: string;
	redress?: string;
	knownTravelNum?: string;
	oldUsername: string;
	usernameTaken: boolean;
	submitSuccess: boolean;
	user: User = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		dob: '',
		gender: '',
		country: '',
		state: '',
		city: '',
		phone: '',
		email: '',
		prefPhone: false,
		prefEmail: false,
		idNum: '',
		idType: '',
		idDate: '',
		idCountry: '',
		idState: '',
		redress: '',
		knownTravelNum: ''
	};

	aUser: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
  	console.log(this.sharedService.user);
  	this.usernameTaken = false;
  	this.submitSuccess = false;
  	this.user = this.sharedService.user;
  	this.uid = this.user._id;
	this.username = this.user.username;
	this.firstName = this.user.firstName;
	this.lastName = this.user.lastName;
	this.dob = this.user.dob;
	this.gender = this.user.gender;
	this.country = this.user.country;
	this.state = this.user.state;
	this.city = this.user.city;
	this.phone = this.user.phone;
	this.email = this.user.email;
	this.prefPhone =  false;
	this.prefEmail =  false;
	this.idNum =  this.idNum;
	this.idType =  this.idType;
	this.idDate =  this.idDate;
	this.idCountry =  this.idCountry;
	this.idState =  this.idState;
	this.redress =  this.redress;
	this.knownTravelNum =  this.knownTravelNum;
	this.oldUsername = this.user.username;
	}

	update(){
		this.username = this.profileForm.value.username;
		this.password = 
		this.firstName = this.profileForm.value.firstName;
		this.lastName = this.profileForm.value.lastName;
		this.dob = this.profileForm.value.dob;
		this.gender = this.profileForm.value.gender;
		this.country = this.profileForm.value.country;
		this.state = this.profileForm.value.state;
		this.city = this.profileForm.value.city;
		this.phone = this.profileForm.value.phone;
		this.email = this.profileForm.value.email;
		this.userService.findUserByUsername(this.username).subscribe(
			(user: User) => {
				this.aUser = user;
				if(this.aUser && this.oldUsername != this.username){
					this.usernameTaken = true;
					this.submitSuccess = false;
				} else {
					const updatedUser: User = {
						_id: this.user._id,
						username: this.username,
						password: this.user.password,
						firstName: this.firstName,
						lastName: this.lastName,
						dob: this.dob,
						gender: this.gender,
						country: this.country,
						state: this.state,
						city: this.city,
						phone: this.phone,
						email: this.email,
						prefPhone: false,
						prefEmail: false,
						idNum: this.idNum,
						idType: this.idType,
						idDate: this.idDate,
						idCountry: this.idCountry,
						idState: this.idState,
						redress: this.redress,
						knownTravelNum: this.knownTravelNum
					};
					this.userService.updateUser(this.user._id, updatedUser).subscribe(
						(res: any) => {
							this.usernameTaken = false;
							this.submitSuccess = true;
						}
					);
				}
			}
		);
		
	}

	logout() {
		this.userService.logout().subscribe(
	     (data: any) => this.router.navigate(['/login'])
	   );

	}
}