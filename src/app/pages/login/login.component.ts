import { Component, OnInit } from '@angular/core';
import {Login} from "../../../assets/model/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {startWith} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//loginData: Login = new Login();
submitted = false;
loginForm: FormGroup = new FormGroup<any>({})
  startWith: any



  constructor(private formGroup: FormBuilder,
              private MatSnack: MatSnackBar,
              private loginService: LoginService
              ) { }


  ngOnInit(): void {
  this.loginForm = this.formGroup.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });


  }


  f(){
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.MatSnack.open('required', '', {
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
      return
    }

    this.loginService.generateToken(this.loginForm.value).subscribe(
      (data:any) =>{
        console.log("successfully");
        console.log(data);
        // login.................................
        this.loginService.loginUser(data.tokens);
        this.loginService.getCurrentUser().subscribe(
          (user:any) =>{
            this.loginService.setUser(user);
            this.loginService.getUser();
            console.log(user);

            // redirect: Admin......
            // redirect: normalUser...
        });
      },
      (error:any) =>{
        console.log('error Occur.................')
        console.log(error)
      });
}

}
