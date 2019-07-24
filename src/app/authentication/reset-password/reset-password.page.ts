import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, 
    private api: AuthService ) { }

  formReset = {
    email: '',
    password: ''
  }
  confirm = ''

  ngOnInit() {
    this.formReset.email = this.route.snapshot.paramMap.get('email');
  }

  navigateTo(page: string) {
    switch (page) {
      case 'login':
        this.router.navigateByUrl('login')
        break;
    
      default:
        break;
    }
  }

  doReset() {
    let timerInterval
    this.api.doReset(this.formReset).subscribe( (res: any) => {
      Swal.fire({
        title: '<strong>Mohon Tunggu</strong>',
        showConfirmButton: false,
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
          }, 3000)
        },
        onClose: () => {
          if(res.code == 200) {
            Swal.fire({
              title: 'Sukses',
              type: 'success',
              html: "Kata Sandi Berhasil diubah, Silahkan login",
              showCloseButton: true,
              showCancelButton: true,
              cancelButtonText: "Tutup",
              focusConfirm: false,
              showConfirmButton: false,
              cancelButtonAriaLabel: 'Tutup',
              onClose : () => {
                this.router.navigateByUrl('login')
              }
            })
            
          } else {
            Swal.fire({
              title: 'Oppss',
              type: 'error',
              html: "Maaf terjadi gangguan, Silahkan coba lagi!",
              showCloseButton: true,
              showCancelButton: true,
              cancelButtonText: "Tutup",
              focusConfirm: false,
              showConfirmButton: false,
              cancelButtonAriaLabel: 'Tutup'
            })
          }
          
          clearInterval(timerInterval)
        }
      })
      console.log(res)
    })
  }

}
