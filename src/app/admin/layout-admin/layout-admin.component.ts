import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminMenuComponent } from '@app/components/admin-menu/admin-menu.component'; 

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, AdminMenuComponent],
  templateUrl: './layout-admin.component.html' 
})
export class LayoutAdminComponent {

}
