import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MiniServicesService } from '../services/mini-services.service';
import { Observable } from 'rxjs';
import { Socket } from 'ng-socket-io';
import { ProfileService } from '../services/profile.service';
import { environment } from 'src/environments/environment'
const MEDIA = environment.imageUrl;
@Component({
  selector: 'app-chat-conselor',
  templateUrl: './chat-conselor.page.html',
  styleUrls: ['./chat-conselor.page.scss'],
})
export class ChatConselorPage implements OnInit {

  @Input() messanger: any;
  messages = []
  uid: any;
  message = {
      user_id: '',
      conseling_id: '',
      text: '',
      _id: '' 
  }
  room_id = ''
  text: '';
  mine: '';
  avatarConselor: any;
  avatarPatient: any;
  constructor(private modalCrl: ModalController, private apiChat: MiniServicesService, private socket: Socket,
    private apiProfile: ProfileService) { }

  ngOnInit() {
    let storeLocal = localStorage.getItem('_USER');
    let id = JSON.parse(storeLocal)._ID;
    this.mine = id
    this.message = {
      user_id: '',
      conseling_id: this.messanger._id,
      text: '',
      _id: '' 
    }
    this.apiChat.getMessages(this.messanger._id).subscribe((result: any) => {
      console.log(result)
      this.messages = result.data;
      this.getRoom().subscribe(data => {
        let user = data['user']
        this.message.user_id = user
        console.log(user);
      })
      this.apiProfile.getProfile(this.messanger.conselorId)
          .subscribe((responseProfile:any) => {
            // console.log(responseProfile.data[0])
            if(responseProfile.data[0].avatar == "") {
              if(responseProfile.data[0].gender == "men") {
                this.avatarConselor = "../../assets/images/men.jpg"
              } else {
                this.avatarConselor = "../../assets/images/women.jpg"
              }
            } else {
              this.avatarConselor = MEDIA+"/media/"+responseProfile.data[0]._id;
            }
          })
        this.apiProfile.getProfile(this.messanger.patientId)
          .subscribe((responseProfile:any) => {
            // console.log(responseProfile.data[0])
            if(responseProfile.data[0].avatar == "" || responseProfile.data[0].avatar.data == null) {
              if(responseProfile.data[0].gender == "men") {
                this.avatarPatient = "../../assets/images/men.jpg"
              } else {
                this.avatarPatient = "../../assets/images/women.jpg"
              }
            } else {
              this.avatarPatient = MEDIA+"/media/"+responseProfile.data[0]._id;
            }
          })
    })
    console.log(this.messanger)
    this.getMessages().subscribe((message: any) => {
      // this.message.text = message
      console.log(message)
      let storeLocal = localStorage.getItem('_USER');
      let id = JSON.parse(storeLocal)._ID;
      this.message = {
        user_id: id,
        conseling_id: this.messanger._id,
        text: message.text,
        _id: this.uid 
      }
      console.log(this.message)
      console.log('kiriman dari '+ this.message.user_id)
      // let newMessage = {
      //   user_id: '',
      //   conseling_id: this.messanger._id,
      //   text: '' 
      // }
      this.messages.push(this.message) 
      // this.apiChat.getMessages(this.messanger._id).subscribe((result: any) => {
      //   console.log('getter')
      // })     
    })
  }

  closeModal() {
    this.modalCrl.dismiss()
  }

  getMessages() {
    let observable = new Observable(obs => {
      this.socket.on('message', data => {
        obs.next(data)
      }) 
    })
    return observable;
  }

  getRoom() {
    let observable = new Observable(obs => {
      this.socket.on('users-changed', data => {
        obs.next(data)
      }) 
    })
    return observable;
  }

  sendMessage() {
    let storeLocal = localStorage.getItem('_USER');
      let id = JSON.parse(storeLocal)._ID;
    this.socket.emit('add-message', {text: this.text})
    // this.message = ''
    let form = {
      user_id: id,
      conseling_id: this.messanger._id,
      text: this.text 
    }
    this.apiChat.sendMessage(form).subscribe((res: any) => {
      console.log(res)
      this.uid = res.data._id;
      // this.messages.push(res.data)
      this.text = ''
    })
  }

  getAvatar(id) {
    
    if(id == this.messanger.conselorId) {
      return this.avatarConselor
    } else {
      return this.avatarPatient
    }
  }
}
