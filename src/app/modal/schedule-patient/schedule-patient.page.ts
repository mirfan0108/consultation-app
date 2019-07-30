import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import { ConselorService } from 'src/app/services/conselor.service';

@Component({
  selector: 'app-schedule-patient',
  templateUrl: './schedule-patient.page.html',
  styleUrls: ['./schedule-patient.page.scss'],
})
export class SchedulePatientPage implements OnInit {
  @Input() detail: any;
  constructor(private modalCtrl: ModalController, private apiMini: MiniServicesService, private api: ConselorService) { }

  scheduleConselor = [];
  weeklyConselor = [];
  timings = [];
  formSchedule = {
    date: "",
    time: "",
    conselor_id: "",
    patient_id: ""
  }
  formConseling = {
    complaint_id: "",
    methode: "",
    option: "",
    result: "",
    patientId: "",
    conselorId: "",
  }
  day = "";
  // formConseling = {

  // }
  ngOnInit() {
    console.log(this.detail)
    this.formConseling.complaint_id = this.detail._id
    this.formConseling.conselorId = this.detail.conselorId
    this.formConseling.patientId = this.detail.patientId
    this.formSchedule.conselor_id = this.detail.conselorId;
    this.formSchedule.patient_id = this.detail.patientId;
    this.formSchedule.date = this.formatDate();
    this.apiMini.getWeekly(this.detail.conselorId)
    .subscribe((res: any) => {
      this.weeklyConselor = res.data[0].week
      console.log(this.weeklyConselor)
      this.timings = []
      this.weeklyConselor.forEach(day => {
        if(day.day == this.day) {
          day.time.forEach(times => {
            if(times.isSelected) {
              this.timings.push(times)
            }
          });
        }
      })
    })
  }

  formatDate() {
    var d = new Date();
    
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    var hari = d.getDay()
    console.log(hari)
    let dayName;
    switch (hari) {
      case 1:
        dayName = "Senin"
        break;
      case 2:
        dayName = "Selasa"
        break;
      case 3:
        dayName = "Rabu"
        break;
      case 4:
        dayName = "Kamis"
        break;
      case 5:
        dayName = "Jumat"
        break;
      default:
        break;
    }
    console.log(dayName)
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.day = dayName
    return [year, month, day].join('-');
  }

  closeModal() {
    this.modalCtrl.dismiss()
    
  }

  checkSchedule() {
    var d = new Date(this.formSchedule.date);
    var hari = d.getDay()
    let dayName;
    switch (hari) {
      case 1:
        dayName = "Senin"
        break;
      case 2:
        dayName = "Selasa"
        break;
      case 3:
        dayName = "Rabu"
        break;
      case 4:
        dayName = "Kamis"
        break;
      case 5:
        dayName = "Jumat"
        break;
      default:
        break;
    }
    console.log(dayName)
    this.day = dayName
    this.timings = []
    if(this.day != undefined) {
      this.weeklyConselor.forEach(day => {
        if(day.day == this.day) {
          day.time.forEach(times => {
            if(times.isSelected) {
              this.timings.push(times)
            }
          });
        }
      })
    }
  }

  doPost() {
    console.log(this.formConseling)
    console.log("----")
    console.log(this.formSchedule)
    let form = {
      formConsult: this.formConseling,
      formSchedule: this.formSchedule
    }
    this.apiMini.createConseling(form).subscribe((res: any) => {
      console.log(res)
      this.api.updateStatusComplaintToConsult(this.detail).subscribe(res => res)
    })
    this.closeModal()
  }

  generateSchedule() {

  }

}
