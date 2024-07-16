import { Routes } from '@angular/router';
import { ErrorComponent } from './components/utils/error/error.component';
import { authGuard } from './helpers/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@app/public/public.routes')
            .then(m => m.publicRoutes)
    },
    {
        path: 'admin',
        loadChildren: () => import('@app/admin/admin.routes')
            .then(m => m.adminRoutes), canActivate: [authGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('@app/auth/auth.routes')
            .then(m => m.authRoutes)
    },
    { path: '**', component: ErrorComponent }
];
