import { Component, OnInit } from '@angular/core';
import { ConselorService } from '../services/conselor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  constructor(private apiComplaint: ConselorService, private router: Router) { }
  complaints: any = []

  ngOnInit() {
    this.apiComplaint.getPatientComplain()
    .subscribe((res: any) => {
      console.log(res.data)
      res.data.map(complain => {
        if(complain.status == 0) {
          this.complaints.push(complain)
        }
      })
    })
  }

  navigateTo(page, data = null) {
    switch (page) {
      case 'home':
        this.router.navigateByUrl('home')
        break;
      case 'create':
        this.router.navigateByUrl('form-complaint')
        break;
      case 'modify':
        console.log(data)
        this.router.navigateByUrl('modify-complaint/'+ data)
        break;
      default:
        break;
    }
  }

}
