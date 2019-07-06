import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ComplainDetailPage } from '../modal/complain-detail/complain-detail.page';
import { ConselingDetailPage } from '../modal/conseling-detail/conseling-detail.page';
import { ConselorService } from '../services/conselor.service';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment'
import Swal  from 'sweetalert2';
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

  ngOnInit() {
    this.appliedData = []
    this.conselingData = []
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
                if(item.profile.avatar == "") {
                  item.profile.gender == "men" ? item.profile.avatar = MEDIA+"/"+"default-men.jpg" : item.profile.avatar = MEDIA+"/"+"default-women.jpg"
                } else {
                  item.profile.avatar = MEDIA+"/"+tempProfile.avatar;
                }
              }
            }
          })
          if(item.status == 0) {
            this.appliedData.push(item);
          } else if(item.status == 1) {
            let myID = JSON.parse(localStorage.getItem("_USER"))
            if(item.conselorId == myID._ID) {
              this.conselingData.push(item)
            } 
          }
        })
        console.log(resp.data)
        
      }
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

  

}
