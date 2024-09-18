import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICocktail } from '@app/models/cocktail';
import { CocktailService } from '@app/services/cocktail.service';
import { I18nService } from '@app/services/i18n.service';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-cocktail-edit',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, RouterLink, CommonModule],
  templateUrl: './cocktail-edit.component.html'
})
export class CocktailEditComponent implements OnInit {

  public showSuccessAlert = false;
  public showErrorAlert = false;

  cocktail: ICocktail = {
    id: 0,
    user_id: 0,
    nom: '',
    description: '',
    recette: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: null
  }

  constructor(private cocktailService: CocktailService,
    private router: Router,
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
      this.router.navigateByUrl('admin')
    }, 1000); // 5 secondes

  }

  ngOnInit(): void {
    let id = this.activated.snapshot.paramMap.get('id')
    console.log(id)
    this.cocktailService.getCocktail(id).subscribe(
      data => {
        console.log(data)
        this.cocktail = data.data
      }
    )
  }

  editCocktail() {
    console.log(this.cocktail)
    this.cocktailService.updateCocktail(this.cocktail).subscribe({
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
    })
  }
}
