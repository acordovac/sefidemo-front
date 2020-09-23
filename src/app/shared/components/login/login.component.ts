import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../core/services/token-storage/token-storage.service";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.form =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser()['roles'];
    }
  }

  public onSubmit(): void {
    this.authService.login(this.form).subscribe(response => {
      this.tokenStorage.saveToken(response['accesToken']);
      this.tokenStorage.saveUser(response);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser()['roles'];
    },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
