import {Component, OnInit,  ViewChild} from '@angular/core';
import {MatSelectionList } from '@angular/material/list';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../shared/models/user';
import {UserService} from '../../core/services/user/user.service';
import { UserPipe } from '../../shared/pipes/user/user.pipe';
import {UserUtils} from '../../core/utils/user-utils';
import {MatDialog, } from '@angular/material/dialog';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {

  @ViewChild('items')
  private items: MatSelectionList;
  public selectedItem = '';
  public userList: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public catalogoList: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // private userUtils: UserUtils;

  constructor(
    private userService: UserService,
    private matDiag: MatDialog
  ) { }

  ngOnInit(): void {
  }

  handleChange(event: any): void {
    if (event.option.value === 'usuarios') {
      this.getUserList();
    }
    if (event.option.value === 'catalogos') {
      this.catalogoList.next([]);
    }

  }

  public editUser(user: User): void {
    const editDialog = this.matDiag.open(EditUserComponent, {
      data: {
        object: user
      }
    });
    editDialog.afterClosed().subscribe( result => this.getUserList());
    // this.userService.updateUser(user).subscribe((updatedUser) => this.getUserList());
  }

  public getUserList(): void {
    this.userService.getAllUsers().subscribe( (users) => this.userList.next(users));
  }

}




