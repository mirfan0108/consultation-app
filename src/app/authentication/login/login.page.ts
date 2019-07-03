import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/auth/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo: any;
  loading: boolean;
  segmentToolbar: 'signin'|'signup';

  submitted = false;
  delay = 5000;

  errorMsgLogin = {
    username: false,
    password: false,
    passwordLength: false
  }

  formRegist = {
    email: '',
    name: '',
    birth: '',
    hp: '',
    address: '',
    gender: 'men',
    avatar: '',
    password: '',
    confirmPassword: ''
  }
  msgErr = "";

  formLogin = {
    username: '',
    password: ''
  }
  resLogin = false;
  resRegist = false;
  next: string;
  constructor(private formBuilder: FormBuilder, private api : AuthService,
    private route: ActivatedRoute, private router: Router, ) { 
    this.loading = false;
    this.logo = '../../../assets/images/logo.png'
  }

  ngOnInit() {
    this.next = this.route.snapshot.queryParams['next'] || '/home';
    if(this.api.isLoggedIn()) {
      window.location.href = this.next;
    }
  }
  
  segmentChanged($event){
    this.segmentToolbar = $event.detail.value;
  }
  doLogin(){
    if(this.formLogin.username == '' || this.formLogin.username == ' ' || this.formLogin.username == null) {
      this.errorMsgLogin.username = true;
      // Swal.fire('Oops...', 'Username tidak boleh kosong', 'error')
    } else {
      this.errorMsgLogin.username = false;
    }
    if (this.formLogin.password == '' || this.formLogin.password == ' ' || this.formLogin.password == null) {
      this.errorMsgLogin.password = true;
    } else {
      this.errorMsgLogin.password = false;
      if (this.formLogin.password.length < 6) {
        this.errorMsgLogin.passwordLength = true;
          // Swal.fire('Oops...', 'Password tidak boleh kosong', 'error')
      } else {
        this.errorMsgLogin.passwordLength = false;
      }
    }
    
    if(!this.errorMsgLogin.username && !this.errorMsgLogin.password && !this.errorMsgLogin.passwordLength) {
      let form = {
        email: this.formLogin.username,
        password: this.formLogin.password
      }
      // if(this.resRegist){
      //   form.password = this.formRegist.confirmPassword;
      //   form.email = this.formRegist.email;  
      // } else {
      //   form.password = this.formLogin.password;
      //   form.email = this.formLogin.username;
      // }
      this.api.login(form).subscribe((res :any) => {
        if(res.length > 0) {
          this.resLogin = true;
          if(res[0]._id) {
            window.location.href = this.next;
          }
        } else {
          this.resLogin = false;
        }
        console.log(res);
        
      });
      
    }
    // this.onSubmit();
    
  }

  doRegist() {
    let form = {
      user: {
        email: this.formRegist.email,
        password: this.formRegist.confirmPassword
      },
      profile: {
        name: this.formRegist.name,
        avatar: "",
        hp: this.formRegist.hp,
        gender: this.formRegist.gender,
        birth: this.formRegist.birth,
        address: this.formRegist.address
      }
    }
    this.api.register(form).subscribe((res: any) => {
      if(res.code == 409)  {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: res.msg
        })
        this.resRegist = false
      } else {
        this.resRegist = true;  
      }
      console.log(res)});
  }

  doSubmit(todo) {
    switch (todo) {
      case 'signin':
        Swal.fire({
          title: '<strong>Mohon Tunggu</strong>',
          showConfirmButton: false,
          timer: this.delay,
          onBeforeOpen: () => {
            this.doLogin()
            Swal.showLoading();
            timerInterval = setInterval(() => {
            }, 100)
          },
          onClose: () => {
            if(!this.resLogin) {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Cek kembali masukan anda!'
              })
            }
            clearInterval(timerInterval)
          }
        })
        break;
    
      case 'signup':
        Swal.fire({
          title: '<strong>Mohon Tunggu</strong>',
          showConfirmButton: false,
          timer: this.delay,
          onBeforeOpen: () => {
            this.doRegist()
            Swal.showLoading();
            timerInterval = setInterval(() => {
            }, 100)
          },
          onClose: () => {
            if(this.resRegist) {
              this.formLogin.username = this.formRegist.email;
              this.formLogin.password = this.formRegist.confirmPassword;
              this.doLogin();
            }
            
            clearInterval(timerInterval)
          }
        })
        break;
      default:
        break;
    }
    let timerInterval;
    
    
  }
}
