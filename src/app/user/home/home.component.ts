import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  private role: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      }, error => {
        this.content = JSON.parse(error.error).message;
      }
    )
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.roles;

      this.showAdminBoard = this.role.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.role.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signout();
    window.location.reload();
  }
}
