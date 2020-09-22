import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../shared/models/user";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  public userList: BehaviorSubject<User[]> = new BehaviorSubject([]);


  constructor(
    private userService: UserService,
    private dialog: MatDialog
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

  public createUser() {
    const createDialog = this.dialog.open(CreateUserComponent, {
      // width: '40%',
      data: {
        edit: false,
        object: {}
      }
    });
    createDialog.componentInstance.saveAction.subscribe( result => {
      console.log(result);
      this.userService.createUser(result).subscribe(response => {
        this.getUserList();
        createDialog.close();
      });
    });
  }

  public editUser(user: User): void {
    const editDialog = this.dialog.open(EditUserComponent, {
      // width: '40%',
      data: {
        edit: false,
        object: user
      }
    });
    editDialog.componentInstance.saveAction.subscribe( result => {
      console.log(result);
      this.userService.updateUser(result).subscribe(response => {
        this.getUserList();
        editDialog.close();
      });
    });
  }


  public deleteUser(user: User): void {
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      // width: '40%',
      data: {
        object: user
      }
    });
    deleteDialog.componentInstance.continueAction.subscribe( result => {
      if (result) {
        this.userService.deleteUser(user).subscribe(response => {
          this.getUserList();
          deleteDialog.close();
        });
      }
    });
  }

}
