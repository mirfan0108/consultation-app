import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { async } from 'q';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  avatarMen = "../../../assets/images/men.jpg";
  formRegist = {
    email: '',
    name: '',
    birth: '',
    hp: '',
    address: '',
    gender: 'men',
    avatar: null,
    password: '',
    confirmPassword: '',
    role: ''
  }
  
  resultRegist: boolean;

  constructor(private router: Router, public formBuilder: FormBuilder, private api : AuthService,
    private route: ActivatedRoute) { }


  ngOnInit() {
  }

  file: File;

  changeListener($event) : void {
      this.file = $event.target.files[0];
      if($event.target.files && $event.target.files[0]){
        let reader = new FileReader();
  
        reader.onload = (event:any) => {
          this.avatarMen = event.target.result;
        }
        reader.readAsDataURL($event.target.files[0]);
      }
        let fileList: FileList = $event.target.files;  
        // let file: File = fileList[0];
        // console.log(file);
  }
  segmentChanged($event){
    this.formRegist.role = $event.detail.value;
  }

  doInputFile() {
    $('#input-avatar').click()
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

  checkRegist() {
    this.formRegist.avatar = this.file
    let msgErr = '';
    let validations_form = this.formBuilder.group({
      name: new FormControl(this.formRegist.name, Validators.required),
      email: new FormControl(this.formRegist.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl(this.formRegist.password, Validators.compose([
        Validators.minLength(6)])),
    });
    if(!validations_form.controls.name.valid) {
      msgErr += "<small style='color:red'>* Nama tidak boleh kosong</small><br>"
      // this.validatorRegist.name.msg = "Nama tidak boleh kosong";
    }
    if(!validations_form.controls.email.valid) {
      msgErr += "<small style='color:red'>* Email tidak boleh kosong atau inputan tidak sesuai dengan format Email</small></br>";
      // this.validatorRegist.email.msg = "Email tidak boleh kosong atau inputan tidak sesuai dengan format Email";
    }
    if(!validations_form.controls.password.valid) {
      msgErr += "<small style='color:red'>* Password minimal 6 karakter</small></br>"
      // this.validatorRegist.password.msg = "Password minimal 6 karakter";
    }  
    if(validations_form.valid) {
      // this.doSubmit('signin')
      let form = {
        email: this.formRegist.email,
        name: this.formRegist.name,
        birth: this.formRegist.birth,
        hp: this.formRegist.hp,
        address: this.formRegist.address,
        gender: this.formRegist.gender,
        avatar: this.file,
        password: this.formRegist.password,
        confirmPassword: this.formRegist.confirmPassword,
        role: this.formRegist.role
      }
      this.doRegist(form);
      console.log(form)
    } else {
      Swal.fire({
        title: 'Opss..',
        type: 'error',
        html: msgErr,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: false,
        cancelButtonAriaLabel: 'Tutup',
      })
      console.log("Form = "+ false)
    }
    console.log(validations_form)
  }

  doRegist(form) {
    let timerInterval
    let formLogin = {
      email: this.formRegist.email,
      password: this.formRegist.password
    }
    Swal.fire({
      title: '<strong>Mohon Tunggu</strong>',
      text: 'Sedang dalam proses registrasi',
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
        await this.api.register(form).subscribe((resp: any) => {
          if(resp.code == 409)  {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: resp.msg
            })
            this.resultRegist = false;
            
          } else {
            this.resultRegist = true;  
            Swal.fire({
              title: '<strong>Mohon Tunggu</strong>',
              text: 'Proses login aplikasi ...',
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
                await this.api.login(formLogin).subscribe((res :any) => {
                  if(res.length > 0) {
                    if(res[0]._id) {
                      if(res[0].role == 1) {
                        this.router.navigateByUrl('/conselor');
                      } else {
                        this.router.navigateByUrl('/home');
                      }
                    }
                  } else {
                    this.router.navigateByUrl('/home');
                  }
                  console.log(res);
                  
                });
                Swal.resumeTimer();
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            })
          }
        });
        Swal.resumeTimer();
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })

   

  }

}
