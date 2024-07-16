import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslocoDirective,
    ReactiveFormsModule
  ],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor(
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(lang => i18nService.changeLanguage(lang));
  }

  actions: Array<any> = [
    { title: "menu.home", "route": "/home", icon: "house" },
    { title: "menu.cocktail", "route": "/cocktail", icon: "cup-straw" },
    { title: "menu.about", "route": "/about", icon: "info-circle" },
  ]

  navbarCollapsed = true;
  currentAction: any

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
