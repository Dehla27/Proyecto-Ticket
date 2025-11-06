import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Login } from './auth/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login }
];

export const appRouting = provideRouter(routes);
