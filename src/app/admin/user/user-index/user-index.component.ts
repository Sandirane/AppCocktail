import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net-bs5';
import { RouterLink } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { IUser } from '@app/models/user';

@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    RouterLink
  ],
  templateUrl: './user-index.component.html' 
})
export class UserIndexComponent implements OnInit {

  dtoptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>()

  userList: IUser[] = []

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      pageLength: 5,
      // order:[1,'asc']
      scrollY: '300',
      language: {
        searchPlaceholder: 'Enter product name'
      }
    }

    this.userService.getAllUsers().subscribe(
      users => {
        console.log(users)
        this.userList = users.data
        this.dttrigger.next(null)
      }
    )
  }

  deleteUser(id: number | undefined) {
    console.log(id)
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log(data)
        this.ngOnInit()
      }
    )
  }
}
