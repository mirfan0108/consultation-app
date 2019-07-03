import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private router: Router, private api: ProfileService) { }

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

  ngOnInit() {
    this.isChanged = false;
    this.api.getProfile(localStorage.getItem('_ID')).subscribe((res: any) => {
      console.log(res)
      let profile = res.data[0];
      this.dataProfile._id = profile._id;
      this.dataProfile.address = profile.address;
      this.dataProfile.avatar = profile.avatar;
      this.dataProfile.birth = profile.birth;
      this.dataProfile.gender = profile.gender;
      this.dataProfile.hp = profile.hp;
      this.dataProfile.name = profile.name;
      this.formUpdate = this.dataProfile;
    })
  }

  navigateTo(page) {
    switch (page) {
      case 'home':
        this.router.navigateByUrl('/home');
        break;
    
      default:
        break;
    }
  }

  doChange() {
    this.isChanged = true;
  }

  doUpdate() {
    this.api.updateProfile(this.formUpdate).subscribe((res: any) => {
      this.dataProfile = this.formUpdate;
      this.isChanged = false;
    })
  }
  
  
}
