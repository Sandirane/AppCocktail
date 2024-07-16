import { Routes } from '@angular/router';
import { CocktailIndexComponent } from './cocktail-index/cocktail-index.component';
import { CocktailAddComponent } from './cocktail-add/cocktail-add.component';
import { CocktailEditComponent } from './cocktail-edit/cocktail-edit.component'; 

export const cocktailRoutes: Routes = [
 
  { path: '', component: CocktailIndexComponent },
  { path: 'add', component: CocktailAddComponent },
  { path: 'edit/:id', component: CocktailEditComponent },
   
 
];
