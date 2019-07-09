import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/auth/user';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo: any;
  loading: boolean;
  segmentToolbar: 'signin'|'signup';

  avatarMen = "../../../assets/images/men.jpg";
  avatarWomen = "../../../assets/images/women.jpg";

  isConselor: boolean = false;

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

  validatorRegist = {
    email: {valid: false, msg: '' },
    name: {valid: false, msg: '' },
    birth: {valid: false, msg: '' },
    hp: {valid: false, msg: '' },
    address: {valid: false, msg: '' },
    gender: {valid: false, msg: '' },
    avatar: {valid: false, msg: '' },
    password: {valid: false, msg: '' },
    confirmPassword: {valid: false, msg: '' }
  }


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
    this.logo = '../../../assets/images/logo-cons.png'
  }

  ngOnInit() {
    this.next = this.route.snapshot.queryParams['next'] || '/home';
    if(this.api.isLoggedIn()) {
      window.location.href = this.next;
    }
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
  doInputFile() {
    $('#input-avatar').click()
  }

  segmentChanged($event){
    this.formLogin.username = '';
    this.formLogin.password = '';
    this.segmentToolbar = $event.detail.value;
  }
  doLogin(){
    if(this.formLogin.username == '' || this.formLogin.username == ' ' || this.formLogin.username == null) {
      this.errorMsgLogin.username = true;
      Swal.fire('Oops...', 'Username tidak boleh kosong', 'error')
    } else {
      this.errorMsgLogin.username = false;
    }
    if (this.formLogin.password == '' || this.formLogin.password == ' ' || this.formLogin.password == null) {
      this.errorMsgLogin.password = true;
      Swal.fire('Oops...', 'Password tidak boleh kosong', 'error')
    } else {
      this.errorMsgLogin.password = false;
      if (this.formLogin.password.length < 6) {
        this.errorMsgLogin.passwordLength = true;
          Swal.fire('Oops...', 'Password tidak boleh Kurang', 'error')
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
            if(res[0].role == 1) {
              this.router.navigateByUrl('/conselor');
            } else {
              this.router.navigateByUrl('/home');
            }
          }
        } else {
          this.resLogin = false;
        }
        console.log(res);
        
      });
      
    }
    // this.onSubmit();
    
  }

  async doRegist() {
    console.log(this.file)
    if(this.file) {
      let form = {
          user: {
            email: this.formRegist.email,
            password: this.formRegist.confirmPassword,
            role: 0
          },
          profile: {
            name: this.formRegist.name,
            hp: this.formRegist.hp,
            gender: this.formRegist.gender,
            birth: this.formRegist.birth,
            address: this.formRegist.address
          },
          avatar: this.file
        }
        if(this.isConselor == true) {
          form.user.role = 1
        } 
        
    
      await  this.api.register(form).subscribe((resp: any) => {
          if(resp.code == 409)  {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: resp.msg
            })
            this.resRegist = false;
            
          } else {
            this.resRegist = true;  
          }
          console.log(resp)});
      // await this.api.uploadAvatar(this.file).subscribe((res: any) => {
      //   if(res.name) {
      //     this.formRegist.avatar = res.name;
      //   }
      //   console.log(res.name)
        
      // })
    } else {
      let form = {
        user: {
          email: this.formRegist.email,
          password: this.formRegist.confirmPassword,
          role: 0
        },
        profile: {
          name: this.formRegist.name,
          avatar: this.formRegist.avatar,
          hp: this.formRegist.hp,
          gender: this.formRegist.gender,
          birth: this.formRegist.birth,
          address: this.formRegist.address
        }
      }
      if(this.isConselor == true) {
        form.user.role = 1
      } 
      
  
      this.api.register(form).subscribe((resp: any) => {
        if(resp.code == 409)  {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: resp.msg
          })
          this.resRegist = false;
          
        } else {
          this.resRegist = true;  
        }
        console.log(resp)});
    }
  }

  checkRegist() {
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
      this.validatorRegist.name.msg = "Nama tidak boleh kosong";
    }
    if(!validations_form.controls.email.valid) {
      msgErr += "<small style='color:red'>* Email tidak boleh kosong atau inputan tidak sesuai dengan format Email</small></br>";
      this.validatorRegist.email.msg = "Email tidak boleh kosong atau inputan tidak sesuai dengan format Email";
    }
    if(!validations_form.controls.password.valid) {
      msgErr += "<small style='color:red'>* Password minimal 6 karakter</small></br>"
      this.validatorRegist.password.msg = "Password minimal 6 karakter";
    }  
    if(validations_form.valid) {
      this.doSubmit('signin')
      
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

  doCheck(todo) {
    switch (todo) {
      case 'signup':
        this.checkRegist();
        break;
    
      default:
        break;
    }
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
            }, 3000)
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
            }, 3000)
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

  navigateTo(page: 'signup' | 'forget') {
    switch (page) {
      case 'signup':
        this.router.navigateByUrl('registration')
        break;
    
      default:
        break;
    }
  }
}
