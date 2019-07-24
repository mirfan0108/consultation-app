import { Component, OnInit } from '@angular/core';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import { ConselorService } from 'src/app/services/conselor.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-complaint',
  templateUrl: './form-complaint.page.html',
  styleUrls: ['./form-complaint.page.scss'],
})
export class FormComplaintPage implements OnInit {
  
  categories: any;
  labelCategory = "Pilih Kategori";
  formComplaint = {
    category: '',
    information: '',
    story: '',

  }
  constructor(private apiCategories: MiniServicesService, private complaintApi: ConselorService,
    private router: Router) { }

  ngOnInit() {
    this.apiCategories.getCategories()
    .subscribe((res: any) => {
      this.categories = res.data
    })
  }
  selectedCategory($event) {
    let id = $event.detail.value;
    this.categories.forEach(category => {
      if(id == category._id){
        this.formComplaint.category = category._id
        this.labelCategory = category.category
      }
    });
  }

  doPost() {
    let storeLocal = localStorage.getItem('_USER');
      let id = JSON.parse(storeLocal)._ID;
    let form = {
      category_id: this.formComplaint.category,
      subyek: this.formComplaint.information,
      story: this.formComplaint.story,
      patientId: id
    }
    let delay = 2000
    let timerInterval = null
    let Error;
    Swal.fire({
      title: '<strong>Mohon Tunggu</strong>',
      showConfirmButton: false,
      timer: delay,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
        }, 3000)
      },
      onOpen: async () => {
        Swal.stopTimer();
        await this.complaintApi.postComplain(form)
        .subscribe(res => {
          if(!res) {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: "Maaf terjadi kesalahan pada server, silahkan coba beberapa saat lagi"
            })
          } else {
            Swal.fire({
              type: 'success',
              title: 'Berhasil',
              text: "Terima Kasih Atas Pengaduannya, Konsultan Kami akan segera menghubungi anda",
              onClose: () => {
                this.router.navigateByUrl('home')
              }
            })
            
          }
        })
        Swal.resumeTimer()
      },
      onClose: () => {
        clearInterval(timerInterval)
        
      }
    })
    
    console.log(this.formComplaint)
  }

  navigateTo(page) {
    switch (page) {
      case 'back':
        this.router.navigateByUrl('complaint')
        break;
      default:
        break;
    }
  }

}
