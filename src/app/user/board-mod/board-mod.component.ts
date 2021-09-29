import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-board-mod',
  templateUrl: './board-mod.component.html',
  styleUrls: ['./board-mod.component.css']
})
export class BoardModComponent implements OnInit {
  content?:string;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getMod().subscribe(
      data =>{
        this.content = data;
      }, error => {
        this.content = JSON.parse(error.error).defaultMessage;
      }
    )
  }
}
