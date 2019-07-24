import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor(private router: Router, private api: AuthService, private route: ActivatedRoute) { }
  form = {code: ''}
  ngOnInit() {
    
  }

  navigateTo(page: string) {
    switch (page) {
      case 'send':
        this.router.navigateByUrl('forget/change-password')
        break;
      case 'login':
        this.router.navigateByUrl('login')
        break;
      default:
        break;
    }
  }

  doVerify() {
    let timerInterval
    this.api.verifyCode(this.form).subscribe((res: any) => {
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
              html: "Verifikasi Berhasil",
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              cancelButtonText: "Tutup",
              showConfirmButton: false,
              cancelButtonAriaLabel: 'Tutup',
              onClose : () => {
                this.router.navigate(['forget/reset-password/'+res.data.email])
              }
            })
            
          } else {
            Swal.fire({
              title: 'Oppss',
              type: 'error',
              html: "Kode yang anda masukan salah",
              showCloseButton: true,
              showCancelButton: true,
              cancelButtonText: "Tutup",
              focusConfirm: false,
              showConfirmButton: false,
              cancelButtonAriaLabel: 'Tutup',
              onClose: () => {
                this.router.navigateByUrl('forget/change-password')
              }
            })
          }
          
          clearInterval(timerInterval)
        }
      })
      console.log(res)
    })
  }

}
