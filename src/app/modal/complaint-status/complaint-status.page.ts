import { Component, OnInit, Input } from '@angular/core';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.page.html',
  styleUrls: ['./complaint-status.page.scss'],
})
export class ComplaintStatusPage implements OnInit {
  @Input() detail: any;
  noted: any
  constructor(private apiMini: MiniServicesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.detail.status == 9) {
      this.apiMini.getDeclineComplaint(this.detail._id)
      .subscribe((res: any) => {
        console.log(res.data[0])
        this.noted = res.data[0]
      })
    }
    // this.detail = {
    //   category_id: "5d3367daf4c76e1758463388",
    //   conselorId: "",
    //   created_on: "2019-07-21T05:23:23.939Z",
    //   patientId: "5d264a2cff8cda0338459fa1",
    //   status: 0,
    //   story: "Sebut saja saya teratai, awalnya sih saya di ajak ke Jakarta dan diiming-iming kerja jadi pegawai. setelah tiba di Jakarta saya disuruh lari pagi terus. sampai sekarang saya disuruh lari pagi. ",
    //   subyek: "Dipaksa Kerja",
    //   __v: 0,
    //   _id: "5d33f6cb6d6d0c0bc09e1e40"
    // }
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }
  
}
