import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss'],
})
export class BoardingPage implements OnInit {
  logo: any;
  constructor() { }

  ngOnInit() {
    this.logo = '../../assets/images/logo.png'
  }

  navigateTo(page: string){
    switch (page) {
      case 'Home':
        console.log('Link To Home Page')
        break;
    
      default:
        break;
    }
  }

}
