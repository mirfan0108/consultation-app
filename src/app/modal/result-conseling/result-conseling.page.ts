import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-result-conseling',
  templateUrl: './result-conseling.page.html',
  styleUrls: ['./result-conseling.page.scss'],
})
export class ResultConselingPage implements OnInit {
  @Input() detail: any;
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

}
