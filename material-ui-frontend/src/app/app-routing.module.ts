import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[RoleGuard], data:{expectedRole: 'User'} },
  { path: 'login', component:LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[RoleGuard], data:{expectedRole: 'Admin'} },
  { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
