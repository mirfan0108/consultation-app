import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { SchedulerService } from '../services/scheduler.service';
import { ConselingApiService } from '../services/conseling-api.service';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment'
import { ModalController } from '@ionic/angular';
import { ResultConselingPage } from '../modal/result-conseling/result-conseling.page';
import { ConselorService } from '../services/conselor.service';
import { MiniServicesService } from '../services/mini-services.service';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from '../chat-room/chat-room.page';
import { PatientPage } from '../room/patient/patient.page';
import { ComplaintStatusPage } from '../modal/complaint-status/complaint-status.page';
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  conselingApp = [];
  categories = [];


  constructor(private router: Router, private api: SchedulerService, private apiConsel: ConselingApiService,
    private apiProfile: ProfileService, private modalCtrl: ModalController,
    private apiComplaint: ConselorService,
    private apiConselor: ConselorService, private apiCategories: MiniServicesService,
    private socket: Socket) {
    let me = localStorage.getItem('_USER')
    if(JSON.parse(me).role == 1) {
      this.router.navigateByUrl('conselor')
    }
  }

  ngOnInit() {
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    if(JSON.parse(storeLocal).role != 0) {
      this.router.navigateByUrl('conselor')
    }
    this.apiCategories.getCategories()
      .subscribe((res: any) => {
        console.log(res.data)
        this.categories = res.data
      })
    this.apiConsel.getPatientConseling(id).subscribe((res: any) => {
      res.data.forEach(element => {
        this.apiConsel.getScheduleConseling(element._id)
          .subscribe((resSchedule: any) => {
            element.schedule = resSchedule.data[0]
          })
        
        this.apiProfile.getProfile(element.conselorId)
          .subscribe((responseProfile:any) => {
            // console.log(responseProfile.data[0])
            if(responseProfile.data[0].avatar == "") {
              if(responseProfile.data[0].gender == "men") {
                responseProfile.data[0].avatar = "../../assets/images/men.jpg"
              } else {
                responseProfile.data[0].avatar = "../../assets/images/women.jpg"
              }
            } else {
              responseProfile.data[0].avatar = MEDIA+"/media/"+responseProfile.data[0]._id;
            }
            element.profile = responseProfile.data[0]
          })
        this.apiConselor.getComplainById(element.complaint_id)
          .subscribe((respComplaint: any) => {
            console.log(respComplaint.data)
            this.categories.forEach(category => {
              if(respComplaint.data.category_id == category._id) {
                element.category = category
              }
            });
          })
          this.conselingApp.push(element)
      });
      console.log(this.conselingApp)
    })
  }
  navigateTo(page) {
    switch (page) {
      case 'schedule':
        this.router.navigateByUrl('/schedule');
        break;
      case 'roomList':
        this.myRoom()
        break;
      case 'pengaduan':
        this.router.navigateByUrl('/schedule');
        break;
      case 'user':
        this.router.navigateByUrl('/user');
        break;
      case 'complaint':
          this.apiComplaint.getPatientComplain()
          .subscribe((res: any) => {
            console.log(res)
            // console.log(res.data)
            // res.data.map(complain => {
            //   if(complain.status != 1 && complain.status != 2) {
            //     this.complaints.push(complain)
            //   }
            // })
            this.complainStatus(res.data[0])
          })
        // this.router.navigateByUrl('/complaint');
        break;
      default:
        break;
    }
  }

  ionViewWillEnter() {
    // this.updateConseling();
    
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

  async complainStatus(data: any) {
    const modal = await this.modalCtrl.create({
      component: ComplaintStatusPage,
      componentProps: {
        detail: data
      }
    });
    return await modal.present();
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


  

  async conselingResult(data: any) {
    console.log(data)
    // const modal = await this.modalCtrl.create({
    //   component: ResultConselingPage,
    //   componentProps: {
    //     detail: data
    //   }
    // });
    // return await modal.present();
  }

  joinChat(data) {
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    console.log(data)
    this.socket.connect()
    this.socket.emit('set-nickname', id)
    this.chatRoom(data)
  }

  async chatRoom(data: any) {
    const modal = await this.modalCtrl.create({
      component: ChatRoomPage,
      componentProps: {
        messanger: data
      }
    });
    return await modal.present();
  }

  async myRoom() {
    const modal = await this.modalCtrl.create({
      component: PatientPage,
      componentProps: {
        conselingApp: this.conselingApp
      }
    });
    return await modal.present();
  }
}
