
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@app/models/user';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-edit.component.html' 
})

export class UserEditComponent implements OnInit {

  user: IUser = {
    id: 0,
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    password: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: null,
  }

  constructor(private activated: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    let id = this.activated.snapshot.paramMap.get('id')
    console.log(id)
    this.userService.getUser(id)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.user = data.data
        }
      )
  }

  editUser(): void {
    console.log(this.user)
    this.userService.updateUser(this.user).subscribe(
      data => console.log(data.message)
    )
  }

}
