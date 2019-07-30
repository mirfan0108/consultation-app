import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import Swal  from 'sweetalert2';
import { SchedulerService } from '../services/scheduler.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConselorService } from '../services/conselor.service';

import { environment } from 'src/environments/environment'
import { ProfileService } from '../services/profile.service';
import { MiniServicesService } from '../services/mini-services.service';
import { SchedulePatientPage } from '../modal/schedule-patient/schedule-patient.page';
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  clocks = [
    {clock:'08:00', avail: 1},{clock:'09:00', avail: 1},{clock:'10:00', avail: 1},
    {clock:'11:00', avail: 1},{clock:'12:00', avail: 1},{clock:'13:00', avail: 1},
    {clock:'14:00', avail: 1},{clock:'15:00', avail: 1},{clock:'16:00', avail: 1},
    {clock:'17:00', avail: 1},{clock:'18:00', avail: 1},{clock:'19:00', avail: 1}
  ];
  constructor(public toastController: ToastController, private api: SchedulerService, private apiMini: MiniServicesService,
    private router: Router, private complaintApi: ConselorService, private profileService: ProfileService, 
    public modalController:ModalController) { }
  formApply = {
    applyDate: '',
    clock: ''
  }

  formConseling = {
    patientId: JSON.parse(localStorage.getItem("_USER"))._ID,
    description: '',
    title: ''
  }

  conselingApp = [];
  complaints: any;
  segmentSchedule: 'new' | 'complaint';
  profile: any;
  conselings = [];
  categories = [];

  logo: any;
  ngOnInit() {
    this.complaints = []
    this.conselings = []
    this.logo = '../../assets/images/logo-cons.png';
    this.segmentSchedule = 'new';
    this.formApply.applyDate = this.formatDate()
    var fromClock = 8;
    let tempClock = {};
    let tempClocks = []
    this.clocks.forEach(item => {
      let form = {
        date: this.formApply.applyDate,
        time: item.clock
      }
      // setTimeout(() => {
      //   this.api.getSchedule(form).subscribe((res: any) => {
      //     res.data.forEach(element => {
      //       if(form.date == element.date && form.time == element.time){
      //         item.avail = 0
      //       } 
      //     });
      //   })
      // }, 500)
    });
    // this.updateConseling()
    this.complaintApi.getPatientComplain().subscribe((res: any) => {
      
      this.complaints = res.data
      if(res.profile.avatar == "") {
        if(res.profile.gender == "men") {
          res.profile.avatar = "../../assets/images/default-men.jpg"
        } else {
          res.profile.avatar = "../../assets/images/default-women.jpg"
        }
      } else {
        res.profile.avatar = MEDIA+"/media/"+res.profile._id;
      }
      this.profile = res.profile
      this.complaints.forEach(element => {
        if(element.status == 1) {
          this.profileService.getProfile(element.conselorId)
          .subscribe((resp: any) => {
            if(resp.data[0].avatar == "") {
              if(resp.data[0].gender == "men") {
                resp.data[0].avatar = "../../assets/images/default-men.jpg"
              } else {
                resp.data[0].avatar = "../../assets/images/default-women.jpg"
              }
            } else {
              resp.data[0].avatar = MEDIA+"/media/"+resp.data[0]._id;
            }
            element.profile_conselor = resp.data[0]
          })
          this.apiMini.getCategory(element.category_id)
            .subscribe((res: any) => {
              element.category = res.data.category
            })
          if(element.status == 1) {
            element.date = "Belum Diatur";
          } else {
            element.date = "19/02/2019 08:00-09:00";
          }
          this.conselings.push(element)
        }
      })

    })
  }


  settingSchedule() {
    console.log(this.formApply)
    this.generateSchedule();
  }

  formatDate() {
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  segmentChanged($event){
    this.complaintApi.getPatientComplain().subscribe((res: any) => {
      this.complaints = res.data
    })
    this.segmentSchedule = $event.detail.value;
  }

  setTime(clock) {
    if(clock.avail) {
      this.formApply.clock = clock.clock;
      this.presentToast('Anda telah memilih pukul'+ this.formApply.clock, 'warning')
    } else {
      this.presentToast('Jam '+ clock.clock +' saat ini tidak tersedia', 'danger')
    }
  }

  async presentToast(msg: string, color = 'primary', position = "middle") {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  generateSchedule(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Topik',
        text: 'Topik yang akan dibahas / Masalah yang dialami'
      },
      {
        title: 'Deskripsi',
        text: 'Deskripsikan secara singkat terkait topik yang akan dibahas'
      }
    ]).then((result) => {
      console.log(result.value)
      if(result.value) {
        let user = JSON.parse(localStorage.getItem('_USER'));
        if (result.value[0] != "" && result.value[1] != "" 
        && result.value[0] != " " && result.value[1] != " " ) {
          this.formConseling.title = result.value[0];
          this.formConseling.description = result.value[1];
          this.api.setSchedule({date: this.formApply.applyDate, time: this.formApply.clock, 
            title: this.formConseling.title, description: this.formConseling.description, patientId: user._ID})
          .subscribe(resp => console.log(resp))
          Swal.fire({
            title: 'All done!',
            confirmButtonText: 'Done'
          })
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Maaf gagal membuat jadwal dikarenakan data yang anda masukan kurang'
          })
        }
      }
    })
  }

  checkSchedule() {
    this.clocks.forEach(item => {
      item.avail = 1;
    })
    this.api.getScheduleByDate(this.formApply.applyDate).subscribe((res: any) => {
      let tempClock = res.data;
      this.clocks.forEach(item => {
        tempClock.forEach(element => {
          if(item.clock == element.time){
            item.avail = 0
          } 
        });
      })
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
        this.api.getScheduleConseling(element.scheduleId).subscribe((res: any) => {
          element.date = res.data[0].date;
          element.time = res.data[0].time;
        })
      });
      this.conselingApp = res.data;
      console.log(this.conselingApp)
    });
  }


  formComplaint = {
    subyek: "",
    description: "",
    patientId: "",
  }

  generateComplaint() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Selanjutnya',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Subjek',
        text: 'Subjek laporan anda.'
      },
      {
        title: 'Laporan',
        text: 'Apa yang anda ingin laporkan ?'
      }
    ]).then((result) => {
      let storeLocal = localStorage.getItem('_USER');
      let id = JSON.parse(storeLocal)._ID;
      this.formComplaint.patientId = id;
      if(result.value) {
        this.formComplaint.subyek = result.value[0];
        this.formComplaint.description = result.value[1];
        this.complaintApi.postComplain(this.formComplaint).subscribe((res: any) => {
          if(res.code == 200) {
            Swal.fire({
              title: 'Done!',
              confirmButtonText: 'Pengaduan anda sudah terkirim'
            })
          } else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Maaf server sedang bermasalah, silahkan coba kembali beberapa saat'
            })
          }
        })
      }
      console.log(this.formComplaint)
      
    })
  }

  openModal(mod, data: any) {
    switch (mod) {
      case 'setSchedule':
        this.setScheduleModal(data)
        break;
    
      default:
        break;
    }
  }

  async setScheduleModal(data: any) {
    const modal = await this.modalController.create({
      component: SchedulePatientPage,
      componentProps: {
        detail: data
      }
    });
    modal.onDidDismiss().then(() => {
      Swal.fire({
        type: 'success',
        title: 'Sukses',
        text: 'Berhasil membuat jadwal konsultasi',
        onClose: () => {
          this.ngOnInit()
          this.router.navigateByUrl('home')
        }
      })
    })
    return await modal.present();
  }
  
}
