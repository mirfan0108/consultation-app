import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OauthGuard } from './guard/oauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'boarding', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[OauthGuard] },
  { path: 'boarding', loadChildren: './boarding/boarding.module#BoardingPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationPageModule' },
  { path: 'login', loadChildren: './authentication/login/login.module#LoginPageModule' },
  { path: 'forget', loadChildren: './authentication/forget/forget.module#ForgetPageModule' },
  { path: 'registration', loadChildren: './authentication/registration/registration.module#RegistrationPageModule' },
  { path: 'setting', loadChildren: './user/setting/setting.module#SettingPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'counselor', loadChildren: './schedule/counselor/counselor.module#CounselorPageModule' },
  { path: 'complaint', loadChildren: './complaint/complaint.module#ComplaintPageModule' },
  { path: 'conselor', loadChildren: './conselor/conselor.module#ConselorPageModule', canActivate:[OauthGuard] },
  { path: 'profile-detail', loadChildren: './modal/profile-detail/profile-detail.module#ProfileDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
