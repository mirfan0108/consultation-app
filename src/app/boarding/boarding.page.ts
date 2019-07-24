import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss'],
})
export class BoardingPage implements OnInit {
  logo: any;
  img1: any;
  img2: any;
  img3: any;
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('starter')) {
      this.router.navigateByUrl('/home');
    }
    this.logo = '../../assets/images/logo-cons.png';
    this.img1 = '../../assets/images/img-boarding1.png'
    this.img2 = '../../assets/images/img-boarding2.png'
    this.img3 = '../../assets/images/img-boarding3.png'
  }

  navigateTo(page: string){
    localStorage.setItem('starter', 'true');
    console.log('tes')
    switch (page) {
      case 'Home':
        console.log('tohome')
        this.router.navigateByUrl('/home');
        break;
    
      default:
        break;
    }
  }

}
