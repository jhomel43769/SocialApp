import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard'; 
import { LandingComponent } from '../components/landing/landing.component';
import { HomeComponent } from '../components/home/home.component';
import { ImageUploadComponent } from '../components/image-upload/image-upload.component';
export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'imageUpload', component: ImageUploadComponent },
];
