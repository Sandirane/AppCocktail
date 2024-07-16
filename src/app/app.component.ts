import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiErrorService } from './services/subjects/api-error.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AppCocktail';
  message = ''

  showAlert: boolean = false;

  constructor(private apiErrorService: ApiErrorService) { }

  ngOnInit() {
    this.apiErrorService.apiError.subscribe(
      data => {
        this.message = data
        this.showAlert = true
      }
    )
  }
}


