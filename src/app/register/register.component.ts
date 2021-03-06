import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: Object | undefined;

  formUser: User = {
    username : '',
    email : '',
    password : ''
  } ;
  users: User[] = [];
  number: number = 0;

  constructor( private userService: UserService, private router:Router ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      response => {
        console.dir(response);
        this.users = response;
        console.log('Users', this.users);
      }
    )
  }

  register() {

    //console.log('Current Input', this.formUser);
    this.userService.createUser(this.formUser).
      subscribe(res => {

        this.data = res; // return 0 means exist
        console.log('Response: ', this.data);
        //表示重複
        if (this.data == 0) {
          console.log("Register failed.");
          this.formUser = {
            username : '',
            email : '',
            password : ''
          } ;
        }//表示可以註冊
        else {
          console.log("Regist succeed.")
          this.router.navigateByUrl("/login");
        }
      })
  }

}
