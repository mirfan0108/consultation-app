import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss'],
})
export class BoardingPage implements OnInit {
  logo: any;
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('starter')) {
      this.router.navigateByUrl('/home');
    }
    this.logo = '../../assets/images/logo-cons.png'
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
