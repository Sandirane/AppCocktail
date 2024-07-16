import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICocktail } from '@app/models/cocktail';
import { CocktailService } from '@app/services/cocktail.service';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-cocktail-add',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, RouterLink, CommonModule],
  templateUrl: './cocktail-add.component.html'
})
export class CocktailAddComponent implements OnInit {

  public showSuccessAlert = false;
  public showErrorAlert = false;

  cocktail: ICocktail = {
    user_id: 1,
    nom: '',
    description: '',
    recette: ''
  }

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

  addCocktail() {
    console.log(this.cocktail)
    this.cocktailService.addCocktail(this.cocktail).subscribe(
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
