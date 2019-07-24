import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private router: Router, private api: AuthService) { }
  formEmail = {
    email: ''
  }
  ngOnInit() {
  }

  navigateTo(page) {
    switch (page) {
      case 'login':
        this.router.navigateByUrl('login')
        break;
      
      default:
        break;
    }
  }

  doSend() {
    let timerInterval = null;
    let code = 0;
    Swal.fire({
      title: '<strong>Mohon Tunggu</strong>',
      text: 'Sedang dalam Proses ...',
      showConfirmButton: false,
      timer: 3000,
      onBeforeOpen: () => {
        // this.doLogin()
        Swal.showLoading();
        timerInterval = setInterval(() => {
        }, 3000)
      },
      onOpen: async () => {
        Swal.stopTimer();
        
        try {
          await this.api.sendEmail(this.formEmail).subscribe(async (res: any) => {
            code = res.code
            
            setTimeout(() => {
              if(code == 200) {
                Swal.fire({
                  title: 'Sukses',
                  type: 'success',
                  html: "Silahkan Cek Email Anda",
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  showConfirmButton: false,
                  cancelButtonAriaLabel: 'Tutup',
                  onClose : () => {
                    this.router.navigateByUrl('forget/verify');
                  }
                })
              } else if(code == 404) {
                Swal.fire({
                  title: 'Oppss',
                  type: 'error',
                  html: "Email Tidak Terdaftar",
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  showConfirmButton: false,
                  cancelButtonAriaLabel: 'Tutup'
                })
              } else {
                Swal.fire({
                  title: 'Aww Snap!!!',
                  type: 'error',
                  html: "Internal Server Error",
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  showConfirmButton: false,
                  cancelButtonAriaLabel: 'Tutup'
                })
              } 
            }, 500)
          })
        } catch (error) {
          console.log(error)
        }
        Swal.resumeTimer();
        
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })

    
  }

}
