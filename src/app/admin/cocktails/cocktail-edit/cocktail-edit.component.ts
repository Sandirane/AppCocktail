import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICocktail } from '@app/models/cocktail';
import { CocktailService } from '@app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-edit',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './cocktail-edit.component.html' 
})
export class CocktailEditComponent implements OnInit {

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

  constructor(private activated: ActivatedRoute, private cocktailService: CocktailService) { }

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
    this.cocktailService.updateCocktail(this.cocktail).subscribe(
      data => console.log(data.message)
    )
  }
}
