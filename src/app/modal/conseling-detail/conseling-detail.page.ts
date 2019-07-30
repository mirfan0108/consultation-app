import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal  from 'sweetalert2';
import { ConselorService } from 'src/app/services/conselor.service';
import { Router } from '@angular/router';
import { ChatRoomPage } from 'src/app/chat-room/chat-room.page';
import { Socket } from 'ng-socket-io';
import { ChatConselorPage } from 'src/app/chat-conselor/chat-conselor.page';


@Component({
  selector: 'app-conseling-detail',
  templateUrl: './conseling-detail.page.html',
  styleUrls: ['./conseling-detail.page.scss'],
})
export class ConselingDetailPage implements OnInit {
  @Input() detail: any;
  constructor(private modalCtrl: ModalController, private api: ConselorService, private router: Router, 
    private socket: Socket) { }

  finishStaging = false;
  ngOnInit() {
    console.log(this.detail)
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

  doPending() {
    this.finishStaging = false;
  }

  doAccept() {
    this.detail.status = 1;
    this.api.updateStatusConseling(this.detail)
    .subscribe(res => {
      console.log(res)
      Swal.fire({
        type: 'success',
        title: 'Selesai',
        text: 'Sesi konsultasi telah diselesaikan',
        onClose: () => {
          this.modalCtrl.dismiss()
          this.router.navigateByUrl('conselor')
        }
      })
    })
    // console.log(this.detail)
  }

  doFinish() {
    this.finishStaging = true;
    
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
  joinChat() {
    // this.modalCtrl.dismiss();
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    this.socket.connect()
    this.socket.emit('set-nickname', id)
    this.chatRoom(this.detail)
    console.log(this.detail)
  }

  async chatRoom(data: any) {
    const modal = await this.modalCtrl.create({
      component: ChatConselorPage,
      componentProps: {
        messanger: data
      }
    });
    return await modal.present();
  }

}
