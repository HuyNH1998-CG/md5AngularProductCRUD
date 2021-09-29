import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?:string;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      data =>{
        this.content = data;
      }, error => {
        this.content = JSON.parse(error.error).defaultMessage;
      }
    )
  }
}
