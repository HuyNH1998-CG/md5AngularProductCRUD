import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  validation_message = {
    username: [
      {type: 'required', message: 'Trường bắt buộc'},
    ],
    password: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'minlength', message: 'Trường phải có ít nhất 6 ký tự'},
    ]
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  onSubmit() {
    const {username, password} = this.loginForm.value;
    this.authService.login(username,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.reloadPage();
      }, error => {
        error.error.forEach((message:any)=>{
          this.errorMessage += message.defaultMessage
        })
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    )
  }

  reloadPage(){
    window.location.reload();
  }
}
