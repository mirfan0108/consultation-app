import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal  from 'sweetalert2';
import { ConselorService } from 'src/app/services/conselor.service';

@Component({
  selector: 'app-complain-detail',
  templateUrl: './complain-detail.page.html',
  styleUrls: ['./complain-detail.page.scss'],
})
export class ComplainDetailPage implements OnInit {
  @Input() detail: any;
  constructor(private modalCtrl: ModalController, private api: ConselorService) { }

  ngOnInit() {
    console.log(this.detail)
    let tempBirth = this.detail.profile.birth.split("T");
    console.log(tempBirth)

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  generateCancellation(){
    this.modalCtrl.dismiss()
    // Swal.mixin({
    //   input: 'text',
    //   confirmButtonText: 'Next &rarr;',
    //   showCancelButton: true,
    //   progressSteps: ['1', '2']
    // }).queue([
    //   {
    //     title: 'Alasan',
    //     text: 'Berikan alasan anda'
    //   },
    //   {
    //     title: 'Pesan',
    //     text: 'Sampaikan pesan anda'
    //   }
    // ]).then((result) => {
    //   console.log(result.value)
    //   if(result.value) {
    //     if (result.value[0] != "" && result.value[1] != "" 
    //     && result.value[0] != " " && result.value[1] != " " ) {
          
    //       Swal.fire({
    //         title: 'All done!',
    //         confirmButtonText: 'Done'
    //       })
    //     } else {
    //       Swal.fire({
    //         type: 'error',
    //         title: 'Oops...',
    //         text: 'Maaf gagal membuat jadwal dikarenakan data yang anda masukan kurang'
    //       })
    //     }
    //   }
    // })
  }

  doAccept() {
    let MyId = JSON.parse(localStorage.getItem("_USER"));
    let form = {
      _id: this.detail._id,
      status: 1,
      title: this.detail.title,
      description: this.detail.description,
      scheduleId: this.detail.scheduleId,
      patientId: this.detail.patientId,
      conselorId: MyId._ID,
      created_on: this.detail.created_on
    }
    this.api.approveComplain(form).subscribe(res => console.log(res));
    Swal.fire(
      'Diterima!',
      'Pengaduan ini akan dimasukan kedalam penjadwalan!',
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

  
}
