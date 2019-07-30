import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { ConselingApiService } from 'src/app/services/conseling-api.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ModalController } from '@ionic/angular';
import { ConselorService } from 'src/app/services/conselor.service';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import { environment } from 'src/environments/environment'
import { Socket } from 'ng-socket-io';
import Swal from 'sweetalert2';
import { ChatRoomPage } from 'src/app/chat-room/chat-room.page';
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  @Input() conselingApp: any;
  categories = [];
  constructor(private router: Router, private api: SchedulerService, private apiConsel: ConselingApiService,
    private apiProfile: ProfileService, private modalCtrl: ModalController,
    private apiConselor: ConselorService, private apiCategories: MiniServicesService,
    private socket: Socket) { }

  ngOnInit() {
    // let storeLocal = localStorage.getItem('_USER');
    // let id = JSON.parse(storeLocal)._ID;
    // if(JSON.parse(storeLocal).role != 0) {
    //   this.router.navigateByUrl('conselor')
    // }
    // this.apiCategories.getCategories()
    //   .subscribe((res: any) => {
    //     console.log(res.data)
    //     this.categories = res.data
    //   })
    // this.apiConsel.getPatientConseling(id).subscribe((res: any) => {
    //   res.data.forEach(element => {
    //     this.apiConsel.getScheduleConseling(element._id)
    //       .subscribe((resSchedule: any) => {
    //         element.schedule = resSchedule.data[0]
    //       })
        
    //     this.apiProfile.getProfile(element.conselorId)
    //       .subscribe((responseProfile:any) => {
    //         // console.log(responseProfile.data[0])
    //         if(responseProfile.data[0].avatar == "") {
    //           if(responseProfile.data[0].gender == "men") {
    //             responseProfile.data[0].avatar = "../../assets/images/men.jpg"
    //           } else {
    //             responseProfile.data[0].avatar = "../../assets/images/women.jpg"
    //           }
    //         } else {
    //           responseProfile.data[0].avatar = MEDIA+"/media/"+responseProfile.data[0]._id;
    //         }
    //         element.profile = responseProfile.data[0]
    //       })
    //     this.apiConselor.getComplainById(element.complaint_id)
    //       .subscribe((respComplaint: any) => {
    //         console.log(respComplaint.data)
    //         this.categories.forEach(category => {
    //           if(respComplaint.data.category_id == category._id) {
    //             element.category = category
    //           }
    //         });
    //       })
    //       this.conselingApp.push(element)
    //   });
    //   console.log(this.conselingApp)
    // })
  }

  navigateTo(page) {
    this.modalCtrl.dismiss()
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
      case 'complaint':
        this.router.navigateByUrl('/complaint');
        break;
      default:
        break;
    }
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

}
