import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-conseling-detail',
  templateUrl: './conseling-detail.page.html',
  styleUrls: ['./conseling-detail.page.scss'],
})
export class ConselingDetailPage implements OnInit {
  @Input() detail: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  closeModal() {
    this.modalCtrl.dismiss()
  }

  generateCancellation(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Alasan',
        text: 'Berikan alasan anda'
      },
      {
        title: 'Pesan',
        text: 'Sampaikan pesan anda'
      }
    ]).then((result) => {
      console.log(result.value)
      if(result.value) {
        if (result.value[0] != "" && result.value[1] != "" 
        && result.value[0] != " " && result.value[1] != " " ) {
          
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
