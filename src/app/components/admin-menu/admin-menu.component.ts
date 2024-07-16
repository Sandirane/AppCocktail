import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ITokenUser } from '@app/models/user';
import { I18nService } from '@app/services/i18n.service';
import { TokenService } from '@app/services/token.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    ReactiveFormsModule
  ],
  templateUrl: './admin-menu.component.html'
})
export class AdminMenuComponent implements OnInit {

  user: ITokenUser = {
    id: 0,
    nom: '',
    prenom: '',
    email: ''
  }

  constructor(
    private router: Router,
    public tokenService: TokenService,
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(lang => i18nService.changeLanguage(lang));
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload()
    console.log(this.user)
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  actions: Array<any> = [
    { title: "menuAdmin.dashboard", "route": "/admin/dashboard", icon: "" },

    
    { title: "menuAdmin.addUser", "route": "/admin/user/add", icon: "" },
    { title: "menuAdmin.userList", "route": "/admin/user", icon: "" },

    { title: "menuAdmin.addCocktail", "route": "/admin/cocktails/add", icon: "" },
    { title: "menuAdmin.cocktailList", "route": "/admin//cocktails", icon: "" },
  ]

  currentAction: any

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    this.tokenService.clearToken()
    this.router.navigateByUrl('/')
  }


}
