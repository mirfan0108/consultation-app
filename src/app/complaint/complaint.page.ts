import { Component, OnInit } from '@angular/core';
import { ConselorService } from '../services/conselor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { ComplaintStatusPage } from '../modal/complaint-status/complaint-status.page';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  constructor(private apiComplaint: ConselorService, private router: Router, private modalCtrl: ModalController) { }
  complaints: any = []
  refreshing = false;
  ngOnInit() {
    this.apiComplaint.getPatientComplain()
    .subscribe((res: any) => {
      console.log(res.data)
      res.data.map(complain => {
        if(complain.status != 1 && complain.status != 2) {
          this.complaints.push(complain)
        }
      })
    })
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
      case 'schedule':
        this.router.navigateByUrl('/schedule');
        break;
      case 'pengaduan':
        this.router.navigateByUrl('/schedule');
        break;
      case 'user':
        this.router.navigateByUrl('/user');
        break;
      case 'complaint':
        this.router.navigateByUrl('/complaint');
        break;
      default:
        break;
    }
  }

  doRefresh(event){
    this.refreshing = true;
    this.complaints = []
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
      
    }, 2000);
    setTimeout(() => {
      this.refreshing = false;
    }, 3000)
  }

  seeComplaintStatus(data) {
    console.log(data)
    this.complainStatus(data)
  }

  async complainStatus(data: any) {
    const modal = await this.modalCtrl.create({
      component: ComplaintStatusPage,
      componentProps: {
        detail: data
      }
    });
    return await modal.present();
  }

  normalizeDate(date: string) {
    let dateChiper = date.split("T")
    let dateArr = dateChiper[0].split("-");
    let dateText;
    switch (dateArr[1]) {
      case "01":
        dateText = dateArr[2]+" Januari "+dateArr[0]
        break;
      case "02":
        dateText = dateArr[2]+" Februari "+dateArr[0]
        break;
      case "03":
        dateText = dateArr[2]+" Maret "+dateArr[0]
        break;
      case "04":
        dateText = dateArr[2]+" April "+dateArr[0]
        break;
      case "05":
        dateText = dateArr[2]+" Mei "+dateArr[0]
        break;
      case "06":
        dateText = dateArr[2]+" Juni "+dateArr[0]
        break;
      case "07":
        dateText = dateArr[2]+" Juli "+dateArr[0]
        break;
      case "08":
        dateText = dateArr[2]+" Agustus "+dateArr[0]
        break;
      case "09":
        dateText = dateArr[2]+" September "+dateArr[0]
        break;
      case "10":
        dateText = dateArr[2]+" Oktober "+dateArr[0]
        break;
      case "11":
        dateText = dateArr[2]+" November "+dateArr[0]
        break;
      case "12":
        dateText = dateArr[2]+" Desember "+dateArr[0]
        break;
      default:
        break;
    }
    return dateText;
  }
  

  

}
