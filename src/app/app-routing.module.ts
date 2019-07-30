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
  { path: 'profile-detail', loadChildren: './modal/profile-detail/profile-detail.module#ProfileDetailPageModule' },
  { path: 'change-password', loadChildren: './authentication/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'verify', loadChildren: './authentication/verify/verify.module#VerifyPageModule' },
  { path: 'reset-password', loadChildren: './authentication/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'patient', loadChildren: './schedule/patient/patient.module#PatientPageModule' },
  { path: 'weekly', loadChildren: './conselor/weekly/weekly.module#WeeklyPageModule' },
  { path: 'form-complaint', loadChildren: './complaint/form-complaint/form-complaint.module#FormComplaintPageModule' },
  { path: 'modify-complaint/:complaintId', loadChildren: './complaint/modify-complaint/modify-complaint.module#ModifyComplaintPageModule' },
  { path: 'conseling', loadChildren: './other/conseling/conseling.module#ConselingPageModule' },
  { path: 'test-ui', loadChildren: './room/test-ui/test-ui.module#TestUiPageModule' },





  // { path: 'result-conseling', loadChildren: './modal/result-conseling/result-conseling.module#ResultConselingPageModule' },
  // { path: 'complaint-status', loadChildren: './modal/complaint-status/complaint-status.module#ComplaintStatusPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
