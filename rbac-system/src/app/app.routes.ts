import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SuperUserDashboardComponent } from './components/superuser-dashboard/superuser-dashboard.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'superuser-dashboard', component: SuperUserDashboardComponent }
];
