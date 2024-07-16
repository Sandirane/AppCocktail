import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { MenuComponent } from '@app/components/menu/menu.component';

@Component({
  selector: 'app-playout',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent],
  templateUrl: './playout.component.html'
})
export class PlayoutComponent {

}
