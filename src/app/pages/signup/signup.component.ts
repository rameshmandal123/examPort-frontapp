import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {FormBuilder} from '@angular/forms'
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 registerForm: FormGroup  = new FormGroup({});
  submitted = false;


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private matSnack: MatSnackBar
  ) {
  }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      dateOfBirth: ['', [Validators.required]],
      about: ['', [Validators.required, Validators.max]],
      gender: ['', [Validators.required]]
    });

  }
  // registerForm = new FormGroup({
  //   firstName: new FormControl('',Validators.required),
  //   lastName: new FormControl('',Validators.required),
  //   username: new FormControl('',Validators.required),
  //   password: new FormControl('',Validators.required),
  //   email: new FormControl('',Validators.required),
  //   phoneNumber:new FormControl('',Validators.required),
  //   dateOfBirth: new FormControl('',Validators.required),
  //   gender: new FormControl('',Validators.required),
  //   about: new FormControl('',Validators.required)
  //
  // })
  //


/// convenience getter for easy access to form fields
  get f() {
    return this.registerForm?.controls;
  }

  onSubmit() {
    console.log(this.registerForm?.value)
    this.submitted = true;
    if (this.registerForm?.invalid) {
     this.matSnack.open("User required !!",'',{
       duration:3000,
       verticalPosition : 'top',
       horizontalPosition: 'right',

     });
      return;
    }

    // AddUser Services from user.........
    this.userService.addUser(this.registerForm?.value)?.subscribe(
      (data:any) => {
        //success..
        console.log(data);
       Swal.fire('Registered Successfully !!!','User id is: '+ data.id ,'success')
      },
      (error) => {
        console.log(error);
        alert('something wrong');
      })
  }
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
