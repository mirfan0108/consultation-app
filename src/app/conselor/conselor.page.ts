import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ComplainDetailPage } from '../modal/complain-detail/complain-detail.page';
import { ConselingDetailPage } from '../modal/conseling-detail/conseling-detail.page';
import { ConselorService } from '../services/conselor.service';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment'
import { ConselorPage as c} from '../room/conselor/conselor.page';
import Swal  from 'sweetalert2';
import { group } from '@angular/animations';
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-conselor',
  templateUrl: './conselor.page.html',
  styleUrls: ['./conselor.page.scss'],
})
export class ConselorPage implements OnInit {

  constructor(private router: Router, public modalController:ModalController, private api: ConselorService,
    private apiProfile: ProfileService) { }

  segmentToolbar: String = 'list'
  appliedData: any = []
  conselingData: any = []
  imgUrl = MEDIA;

  listAppliesDate: any;
  complaintsGroup = []

  ngOnInit() {
    this.appliedData = []
    this.conselingData = []
    this.complaintsGroup = []
    this.api.getAll()
    .subscribe((resp: any) => {
      if(resp.success) {
        resp.data.forEach(item => {
          this.apiProfile.getProfile(item.patientId)
          .subscribe((resProfile:any) => {
            let tempProfile
            if(resProfile) {
              if(resProfile.data[0]) {
                tempProfile = resProfile.data[0]
                item.profile = tempProfile
                console.log(item.profile.avatar)
                if(item.profile.avatar.data == null || item.profile.avatar == "") {
                  item.profile.gender == "men" ? item.profile.avatar = "../../assets/images/default-men.jpg" : item.profile.avatar = "../../assets/images/default-women.jpg"
                } else {
                  item.profile.avatar = MEDIA+"/"+tempProfile.avatar;
                }
              }
            }
          })
          if(item.status == 0) {
            this.appliedData.push(item);
          } 
        })
        console.log(resp.data)
        
      }
      this.api.getComplain().subscribe((resComplaint: any) => {
        let dates = []

        resComplaint.data.forEach(element => {
          let tempDate = element.created_on.split("T")[0]
          const i = dates.findIndex(_item => _item === tempDate);
          if (i > -1) {
          } else {
            dates.push(tempDate);
          }
          console.log(i);
          console.log(tempDate)
        });
        
        dates.forEach(element => {
          let tempData = {
            date: element,
            data: []
          }
          resComplaint.data.forEach(_element => {
            let tempDate = _element.created_on.split("T")[0]
            if(tempDate == element) {
              tempData.data.push(_element)
            }
          });
          this.complaintsGroup.push(tempData)
        });
        console.log(dates)
        
        this.complaintsGroup.forEach(group => {
          group.data.forEach(data => {
            this.apiProfile.getProfile(data.patientId)
              .subscribe((responseProfile:any) => {
                console.log(responseProfile.data[0])
                if(responseProfile.data[0].avatar == "" || responseProfile.data[0].avatar.data == null) {
                  if(responseProfile.data[0].gender == "men") {
                    responseProfile.data[0].avatar = "../../assets/images/men.jpg"
                  } else {
                    responseProfile.data[0].avatar = "../../assets/images/women.jpg"
                  }
                } else {
                  responseProfile.data[0].avatar = MEDIA+"/media/"+responseProfile.data[0]._id;
                }
                data.profile = responseProfile.data[0]
              })
          })
        })

        this.api.getConsultation(JSON.parse(localStorage.getItem("_USER"))._ID)
        .subscribe((responseConsult: any) => {
          this.conselingData = [];
          responseConsult.data.forEach(consult => {
            this.apiProfile.getProfile(consult.patientId)
              .subscribe((responseProfile:any) => {
                console.log(responseProfile.data[0])
                if(responseProfile.data[0].avatar == "") {
                  if(responseProfile.data[0].gender == "men") {
                    responseProfile.data[0].avatar = "../../assets/images/men.jpg"
                  } else {
                    responseProfile.data[0].avatar = "../../assets/images/women.jpg"
                  }
                } else {
                  responseProfile.data[0].avatar = MEDIA+"/media/"+responseProfile.data[0]._id;
                }
                consult.profile = responseProfile.data[0]
              })
              if(consult.status != 1) {
                this.conselingData.push(consult)
              }
          });
        })
        console.log(this.complaintsGroup)
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

  segmentChanged($event){
    this.segmentToolbar = $event.detail.value;
  }

  navigateTo(page) {
    switch (page) {
      case 'user':
        this.router.navigateByUrl('/user');
      break;
      case 'roomList':
        this.myRoom()
      break;
      case 'scheduler':
        this.router.navigateByUrl('/weekly');
      break;
      default:
        break;
    }
  }

  openModal(modal: String, data = null) {
    switch (modal) {
      case 'complain':
        this.complainModal(data)
        
        break;
      case 'conseling':
        this.conselingModal(data)
      default:
        break;
    }
  }

  async complainModal(data: any) {
    const modal = await this.modalController.create({
      component: ComplainDetailPage,
      componentProps: {
        detail: data
      }
    });
    modal.onDidDismiss().then(() => {
      this.ngOnInit()
    })
    return await modal.present();
  }

  async conselingModal(data: any) {
    const modal = await this.modalController.create({
      component: ConselingDetailPage,
      componentProps: {
        detail: data
      }
    });
    return await modal.present();
  }

  async myRoom() {
    const modal = await this.modalController.create({
      component: c,
      componentProps: {
        conselingData: this.conselingData
      }
    });
    return await modal.present();
  }
  

}
