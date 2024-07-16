import { Routes } from "@angular/router";
import { CocktailComponent } from "./cocktail/cocktail.component"; 
import { HomeComponent } from "./home/home.component";
import { PlayoutComponent } from "./playout/playout.component";
import { AboutComponent } from "./about/about.component";



export const publicRoutes: Routes = [
  {
    path: '', 
    component: PlayoutComponent, 
    children: [

      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: HomeComponent },
      { path: 'cocktail', component: CocktailComponent },
      { path: 'about', component: AboutComponent }

    ]
  },

];