import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPage } from './forget.page';
// import { VerifyPage } from '../verify/verify.page';

const forgetRoutes: Routes = [
    {
      path: '',
      component: ForgetPage,
      children: [
        {
          path: '',
          redirectTo: '/forget/verify',
          pathMatch: 'full'
        },
        {
          path: 'verify',
          children: [
            {
              path: '',
              loadChildren: '../verify/verify.module#VerifyPageModule'
            }
          ]
        },
        {
          path: 'change-password',
          children: [
            {
              path: '',
              loadChildren: '../change-password/change-password.module#ChangePasswordPageModule'
            }
          ]
        },
        {
          path: 'reset-password/:email',
          children: [
            {
              path: '',
              loadChildren: '../reset-password/reset-password.module#ResetPasswordPageModule'
            }
          ]
        }
      ],
    },
];
  
  @NgModule({
    imports: [RouterModule.forChild(forgetRoutes)],
    exports: [RouterModule]
  })
  export class ForgetPageRoutingModule { }