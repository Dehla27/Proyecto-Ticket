// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // RUTA KIOSKO (Estilo Módulo / Lazy Loading Clásico)
  {
    path: 'kiosko',
    loadChildren: () => import('./kiosko/kiosko.module').then(m => m.KioskoModule)
  },


  { path: '**', redirectTo: '/login' }
];
