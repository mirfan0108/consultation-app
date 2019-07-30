import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal  from 'sweetalert2';
import { ConselorService } from 'src/app/services/conselor.service';
import { MiniServicesService } from 'src/app/services/mini-services.service';
@Component({
  selector: 'app-complain-detail',
  templateUrl: './complain-detail.page.html',
  styleUrls: ['./complain-detail.page.scss'],
})
export class ComplainDetailPage implements OnInit {
  @Input() detail: any;
  title = "";
  constructor(private modalCtrl: ModalController, private api: ConselorService, private apiMini: MiniServicesService) { }

  ngOnInit() {
    console.log(this.detail)
    let tempBirth = this.detail.profile.birth.split("T");
    console.log(tempBirth)
    this.getCategory()
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  generateCancellation(){
    // this.modalCtrl.dismiss()
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'Catatan',
        text: 'Berikan catatan'
      }
    ]).then((result) => {
      console.log(result.value)
      if(result.value) {
        if (result.value[0] != ""  
        && result.value[0] != " " ) {
          console.log(this.detail)
          let formDecline = {
            complaint_id: this.detail._id,
            note: result.value[0]
          }
          let formUpdateStatus = {
            _id: this.detail._id,
            status: 9,
            category_id: this.detail.category_id,
            subyek: this.detail.subyek,
            story: this.detail.story,
            patientId: this.detail.patientId,
            conselorId: this.detail.conselorId,
            created_on: this.detail.created_on
          }
          this.apiMini.declineComplaint(formDecline).subscribe(resp => {
            if(resp) {
              this.api.ignoreComplain(formUpdateStatus) .subscribe(res => {
                if(res) {
                  Swal.fire({
                    title: 'Berhasil disimpan!',
                    confirmButtonText: 'Done',
                    onClose: () => {
                      this.modalCtrl.dismiss()
                    }
                  })
                }
              })
            }
          })
          
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Maaf gagal, dikarenakan anda belum memberikan catatan'
          })
        }
      }
    })
  }

  doAccept() {
    let MyId = JSON.parse(localStorage.getItem("_USER"));
    let form = {
      conselorId: MyId._ID,
      created_on: this.detail.created_on,
      description: this.detail.description,
      patientId: this.detail.patientId,
      status: 1,
      _id: this.detail._id,
      subyek: this.detail.subyek,
      
    }
    console.log(this.detail)
    this.api.approveComplain(form).subscribe(res => console.log(res));
    Swal.fire(
      'Diterima!',
      'success',
    )
    setTimeout(() => {
      this.modalCtrl.dismiss()
    }, 1500)
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

  getCategory() {
    this.apiMini.getCategory(this.detail.category_id)
    .subscribe((res: any) => {
      this.title = res.data.category
      console.log(this.title)
    })
  }
  
  
  
}
