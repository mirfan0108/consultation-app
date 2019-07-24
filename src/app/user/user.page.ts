import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment'
import * as $ from 'jquery'
import Swal  from 'sweetalert2';
import { AuthService } from '../services/auth.service';
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private router: Router, private api: ProfileService, private apiUpload : AuthService) { }
  
  isChanged: boolean = false;

  dataProfile = {
    _id: '',
    name: '',
    birth: '',
    address: '',
    avatar: '',
    hp: '',
    gender: ''
  }

  formUpdate = {
    _id: '',
    name: '',
    birth: '',
    address: '',
    avatar: '',
    hp: '',
    gender: ''
  }
  tempAvatar: string;
  isAvatarChanged: boolean;
  role: number;

  ngOnInit() {
    let tempData = JSON.parse(localStorage.getItem('_USER'));
    this.role = tempData.role
    this.isChanged = false;
    this.isAvatarChanged = false;
    this.api.getProfile(tempData._ID).subscribe((res: any) => {
      console.log(res)
      let profile = res.data[0];
      this.tempAvatar = profile.avatar;
      this.dataProfile._id = profile._id;
      this.dataProfile.address = profile.address;
      this.dataProfile.birth = profile.birth;
      this.dataProfile.gender = profile.gender;
      this.dataProfile.hp = profile.hp;
      this.dataProfile.name = profile.name;
      this.formUpdate = this.dataProfile;
      if(profile.avatar == "") {
        if(profile.gender == "men") {
          this.dataProfile.avatar = "../../assets/images/default-men.jpg"
        } else {
          this.dataProfile.avatar = "../../assets/images/default-women.jpg"
        }
      } else {
        this.dataProfile.avatar = MEDIA+"/media/"+profile._id;
      }
    })
  }

  file: File
  changeListener($event) : void {
    this.file = $event.target.files[0];
    if($event.target.files && $event.target.files[0]){
      let reader = new FileReader();
      this.isAvatarChanged = true;
      reader.onload = (event:any) => {
        this.dataProfile.avatar = event.target.result;
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

  navigateTo(page) {
    switch (page) {
      case 'home':
        // this.apiUpload.
        if(this.role == 1) {
          this.router.navigateByUrl('/conselor');

        } else {

          this.router.navigateByUrl('/home');
        }
        break;
    
      default:
        break;
    }
  }

  doChange() {
    this.isChanged = true;
  }

  doUpdate() {
    if(this.isAvatarChanged) {
      // console.log(true)
      this.apiUpload.uploadAvatar(this.file).subscribe((res: any) => {
        if(res.name) {
          this.formUpdate.avatar = res.name;
          this.isAvatarChanged = false;
          
        }
        this.api.updateProfile(this.formUpdate).subscribe((resp: any) => {
          this.dataProfile = this.formUpdate;
          this.dataProfile.avatar = MEDIA+"/"+res.name;
          this.isChanged = false;
          Swal.fire({
            type: 'success',
            title: 'Sukses',
            text: "Profile berhasil diupdate"
          })
        })
      })
    } else {
      this.api.updateProfile(this.formUpdate).subscribe((res: any) => {
        this.dataProfile = this.formUpdate;
        this.dataProfile.avatar = MEDIA+"/"+this.formUpdate.avatar;
        this.isChanged = false;
        Swal.fire({
          type: 'success',
          title: 'Sukses',
          text: "Profile berhasil diupdate"
        })
      })
    }
    
  }
  
  
}
