import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICocktail } from '@app/models/cocktail';
import { CocktailService } from '@app/services/cocktail.service';
import { I18nService } from '@app/services/i18n.service';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net-bs5';
import { Subject } from 'rxjs'; 
 
@Component({
  selector: 'app-cocktail-index',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    RouterLink 
  ],
  templateUrl: './cocktail-index.component.html'
})
 
export class CocktailIndexComponent implements OnInit {
 
  dtoptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>()

  cocktailList: ICocktail[] = []

  availableLangs = this.i18nService.availableLangs;
  langCtrl = this.fb.control(this.i18nService.lang);
 
  constructor(
    private cocktailService: CocktailService,
    private fb: NonNullableFormBuilder,
    private i18nService: I18nService) {
    this.langCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(lang => i18nService.changeLanguage(lang));
  }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20, 50, 100],
      pageLength: 5,
      // order:[1,'asc']
      scrollY: '300',
      language: {
        searchPlaceholder: 'Enter product name'
      }
    }

    this.cocktailService.getAllCocktails().subscribe(
      data => {
        console.log(data)
        this.cocktailList = data.data
        this.dttrigger.next(null)
      }
    )

  }

  deleteCocktail(id: number | undefined) {
    console.log(id)
    this.cocktailService.deleteCocktail(id).subscribe(
      data => {
        console.log(data)
        this.ngOnInit()
      }
    )
  }

  trashCocktail(id: number | undefined) {
    console.log(id)
    this.cocktailService.trashCocktail(id).subscribe(
      data => {
        console.log(data)
        this.ngOnInit()
      }
    )
  }

  unTrashCocktail(id: number | undefined) {
    console.log(id)
    this.cocktailService.untrashCocktail(id).subscribe(
      data => {
        console.log(data)
        this.ngOnInit()
      }
    )
  }


} 

