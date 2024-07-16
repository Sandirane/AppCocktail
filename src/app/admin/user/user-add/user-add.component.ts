import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '@app/models/user';
import { I18nService } from '@app/services/i18n.service';
import { UserService } from '@app/services/user.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, RouterLink, CommonModule],
  templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {

  public showSuccessAlert = false;
  public showErrorAlert = false;

  user: IUser = {
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    password: '',
  }

  constructor(
    private activated: ActivatedRoute, 
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
    }, 1000); // 5 secondes

  }

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => {
        console.log("data :", data)
      }
    )
  }

  addUser() {
    console.log(this.user)
    this.userService.addUser(this.user).subscribe(
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
