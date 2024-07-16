import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CocktailService } from '@app/services/cocktail.service';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoDirective, RouterLink, CommonModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor(private cocktailService: CocktailService,
    private activated: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => i18nService.changeLanguage(lang));
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);
}
