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
    this.logo = '../../assets/images/logo.png'
  }

  navigateTo(page: string){
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
