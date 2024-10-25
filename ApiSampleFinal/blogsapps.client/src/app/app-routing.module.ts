import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginCreateComponent } from './components/login-create/login-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BaneoPostComponent } from './components/baneo-post/baneo-post.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'Profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'LoginCreate', component: LoginCreateComponent },
  { path: 'Mantenimiento', component: MaintenanceComponent },
  { path: 'AdminPanel', component: AdminPanelComponent },
  { path: 'Header', component: HeaderComponent },
  { path: 'Footer', component: FooterComponent },
  { path: 'BaneoPost', component: BaneoPostComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/Home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*canActivate: [AuthGuard]*/