import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: LayoutAdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: '',
                loadChildren: () => import('@app/public/public.routes')
                    .then(m => m.publicRoutes)
            },
            {
                path: 'user',
                loadChildren: () => import('@app/admin/user/user.routes')
                    .then(m => m.userRoutes)
            },
            {
                path: 'cocktails',
                loadChildren: () => import('@app/admin/cocktails/cocktail.routes')
                    .then(m => m.cocktailRoutes)
            }
        ]
    }

];

