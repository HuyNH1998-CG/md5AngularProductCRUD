import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  isSuccessful = false;
  isSignUpFailed = false;
  validation_message = {
    username: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'minlength', message: 'Trường phải có ít nhất 3 ký tự'},
      {type: 'maxlength', message: 'Trường không được dài hơn 20 ký tự'}
    ],
    email: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'email', message: 'Nhập đúng định dạng abc@abc.abc'}
    ],
    password:[
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'minlength', message: 'Trường phải có ít nhất 6 ký tự'},
    ]
  }
  errorMessage = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.registerForm.invalid){
      return
    }
    const {username, email, password} = this.registerForm.value;
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }, error => {
        error.error.forEach((message:any)=>{
          this.errorMessage += message.defaultMessage
        })
        this.isSignUpFailed = true;
        this.isSuccessful = false;
      }
    )
  }
}
