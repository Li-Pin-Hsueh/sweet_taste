import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: User = {
    username: String(""),
    email: String(""),
    password: String(""),
  };

  users: User[] = [];
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    if (sessionStorage.getItem("email")) {
      const temp = sessionStorage.getItem("email") as String;
      this.loginUser.email = temp;
    }
    this.userService.getUser().subscribe(
      response => {
        console.dir(response);
        this.users = response;
        console.log(this.users);
      }
    )

  }

  login() {

    console.log('current login input', this.loginUser);
    this.userService.doLogin(this.loginUser).
      subscribe(res => {

        let data = res;
        console.log('回傳結果', data);
        //表示重複
        if (data == 1) {
          window.alert("登入成功！");
          sessionStorage.setItem("email", String(this.loginUser.email));
          sessionStorage.setItem("password", String(this.loginUser.password));
          this.router.navigateByUrl("/");

        }//表示可以註冊
        else {
          window.alert("帳號或密碼錯誤！")
          this.loginUser.email = "";
          this.loginUser.password = "";
        }
      })
  }

}
