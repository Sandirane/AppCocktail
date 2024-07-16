import { Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ProfileComponent } from '../profile/profile.component';

export const userRoutes: Routes = [

    { path: '', component: UserIndexComponent },
    { path: 'add', component: UserAddComponent },
    { path: 'edit/:id', component: UserEditComponent },
    { path: 'profile', component: ProfileComponent },

];
