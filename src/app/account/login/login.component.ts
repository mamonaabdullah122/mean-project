
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AccountserviceService} from '../accountservice.service';
import {Userloginfo} from '../userloginfo';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  datasaved = false;
  message: string;
  status:string;
  errorStatus:any;
  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService,private router:Router) {
    if(localStorage.getItem('Loginuser')){
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.setFormState();
  }
  setFormState(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }

  onSubmit() {

    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();
  }
  userLogin(logininfo:Userloginfo) {
    this.accountservice.userlogin(logininfo).subscribe(
      (resResult) => {
       let resp=JSON.stringify(resResult);
       console.log(resp);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
        if(resResult['status']=='success'){
        localStorage.setItem('Loginuser',resp);
        this.router.navigate(['/']);
        }else{
          localStorage.removeItem('Loginuser');
        }
       this.loginForm.reset();
      }
    )
  }

}
