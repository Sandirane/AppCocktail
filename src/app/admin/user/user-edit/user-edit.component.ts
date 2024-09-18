
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser } from '@app/models/user';
import { I18nService } from '@app/services/i18n.service';
import { UserService } from '@app/services/user.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, RouterLink, CommonModule],
  templateUrl: './user-edit.component.html'
})

export class UserEditComponent implements OnInit {

  public showSuccessAlert = false;
  public showErrorAlert = false;

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

  constructor(
    private activated: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => i18nService.changeLanguage(lang));
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  private hideAlertsAfterTimeout() {
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.showErrorAlert = false; 
      this.router.navigateByUrl('admin')
    }, 1000); // 5 secondes

  }

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
      {
        next: data => {
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
          this.hideAlertsAfterTimeout();
          console.log(data.message)
        },
        error: err => {
          this.showSuccessAlert = false;
          this.showErrorAlert = true;
          this.hideAlertsAfterTimeout();
          console.log(err);
        }
      }
    )
  }

}
