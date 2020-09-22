import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  public userList: BehaviorSubject<User[]> = new BehaviorSubject([]);


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getUserList();
  }


  public getNameLabel(user: User): string {
    return `${user.nombre} ${user.primerApellido} ${user.segundoApellido}`;
  }



  public getUserList(): void {
    this.userService.getAllUsers().subscribe( (users) => this.userList.next(users));
  }


}
