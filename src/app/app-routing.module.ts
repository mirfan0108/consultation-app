import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'boarding', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'boarding', loadChildren: './boarding/boarding.module#BoardingPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationPageModule' },
  { path: 'login', loadChildren: './authentication/login/login.module#LoginPageModule' },
  { path: 'forget', loadChildren: './authentication/forget/forget.module#ForgetPageModule' },
  { path: 'registration', loadChildren: './authentication/registration/registration.module#RegistrationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
