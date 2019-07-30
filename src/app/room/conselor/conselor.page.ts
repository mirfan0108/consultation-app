import { Component, OnInit, Input } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { ModalController } from '@ionic/angular';
import { ChatConselorPage } from 'src/app/chat-conselor/chat-conselor.page';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conselor',
  templateUrl: './conselor.page.html',
  styleUrls: ['./conselor.page.scss'],
})
export class ConselorPage implements OnInit {

  @Input() conselingData: any
  constructor(private socket: Socket, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    console.log(this.conselingData)
  }

  joinChat(data) {
    // this.modalCtrl.dismiss();
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    this.socket.connect()
    this.socket.emit('set-nickname', id)
    this.chatRoom(data)
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

  navigateTo(page) {
    this.modalCtrl.dismiss()
    switch (page) {
      case 'user':
        this.router.navigateByUrl('/user');
      break;
      case 'scheduler':
        this.router.navigateByUrl('/weekly');
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
        window.location.href="/home";
      }
    })
    
  }

}
