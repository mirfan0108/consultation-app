import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.page.html',
  styleUrls: ['./user-agreement.page.scss'],
})
export class UserAgreementPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  iAgree() {
    this.modalCtrl.dismiss()
  }

}
