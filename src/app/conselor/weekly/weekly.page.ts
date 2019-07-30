import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  constructor(private router: Router, private api: MiniServicesService) { }

  weekly = []
  isChanged = false;
  
  ngOnInit() {
    let id = JSON.parse(localStorage.getItem("_USER"))._ID
    this.api.getWeekly(id).subscribe((res: any) => {
      this.weekly = res.data[0].week
    })
  }


  navigateTo(page) {
    switch (page) {
      case 'user':
        this.router.navigateByUrl('/user');
      break;
      case 'scheduler':
        this.router.navigateByUrl('/weekly');
      break;

      case 'conselor':
        this.router.navigateByUrl('/conselor');
      break;

      default:
        break;
    }
  }

  doSubmit() {
    let id = JSON.parse(localStorage.getItem("_USER"))._ID
    let form = {
      week: this.weekly,
      conselor_id: id
    }
    this.api.putWeekly(form).subscribe(res => console.log(res))
    this.isChanged = false
  }

  doChange() {
    this.isChanged = true;
  }
  doLogout() {

    Swal.fire({
      title: 'Keluar',
      text: "Apa anda yakin ingin keluar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        window.location.href="/home";
      }
    })
    
  }

  
}
