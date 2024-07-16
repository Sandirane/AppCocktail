import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslocoDirective,
    ReactiveFormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(lang => i18nService.changeLanguage(lang));
  }

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);
}
