import { Component } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ICredentials } from '@app/models/credentials';
import { IToken } from '@app/models/token';
import { AuthService } from '@app/services/auth.service';
import { TokenService } from '@app/services/token.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    RouterLink,
    CommonModule,
    TranslocoDirective,
    ReactiveFormsModule],
  templateUrl: './login.component.html'
})

export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(lang => i18nService.changeLanguage(lang));
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  credentials: ICredentials = {
    email: '',
    password: ''
  };

  authenticate(): void {
    console.log(this.credentials);
    this.authService.login(this.credentials).subscribe(
      (data: IToken) => {
        console.log(data.access_token)
        this.tokenService.saveToken(data.access_token)
        this.router.navigateByUrl('admin')
      },
      err => console.log(err)
    );
  }
}

