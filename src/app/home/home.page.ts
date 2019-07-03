import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { SchedulerService } from '../services/scheduler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  conselingApp = [];

  constructor(private router: Router, private api: SchedulerService) {}
  navigateTo(page) {
    switch (page) {
      case 'schedule':
      this.router.navigateByUrl('/schedule');
      break;
      case 'pengaduan':
      this.router.navigateByUrl('/schedule');
      break;
      case 'user':
      this.router.navigateByUrl('/user');
      break;
      default:
        break;
    }
  }

  ionViewWillEnter() {
    this.updateConseling();
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
        window.location.reload();
      }
    })
    
  }

  updateConseling() {
    this.api.getConseling().subscribe((res: any) => {
      // this.conselingApp = res.data;
      res.data.forEach(element => {
        if(element.status == 1) {
          element.statusTxt = "Jadwal Telah Disetujui"
          element.color = "primary"
        } else if(element.status == 9) {
          element.statusTxt = "Jadwal Telah Ditolak"
          element.color = "danger"
        } else {
          element.statusTxt = "Menunggu Konsfirmasi"
          element.color = "warning"
        }
        setTimeout(() => {
          this.api.getScheduleConseling(element.scheduleId).subscribe((res: any) => {
            element.date = res.data[0].date;
            element.time = res.data[0].time;
          })
        }, 500)
      });
      this.conselingApp = res.data;
      console.log(this.conselingApp)
    });
  }
}
