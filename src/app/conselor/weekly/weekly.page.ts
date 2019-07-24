import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {

  constructor(private router: Router) { }


  formAvailable = [
    {
      day: 'mon',
      time: []
    },
    {
      day: 'tue',
      time: []
    },
    {
      day: 'wed',
      time: []
    },
    {
      day: 'thu',
      time: []
    },
    {
      day: 'fri',
      time: []
    },
  ]


  times1 = [
    {
      time: "07:00",
      color: "dark",
      disabled: false
    },
    {
      time: "08:00",
      color: "dark",
      disabled: false
    },
    {
      time: "09:00",
      color: "dark",
      disabled: false
    },
    {
      time: "10:00",
      color: "dark",
      disabled: false
    }
  ]
  
  times2 = [
    {
      time: "11:00",
      color: "dark",
      disabled: false
    },
    {
      time: "12:00",
      color: "dark",
      disabled: false
    },
    {
      time: "13:00",
      color: "dark",
      disabled: false
    },
    {
      time: "14:00",
      color: "dark",
      disabled: false
    }
  ]

  times3 = [
    {
      time: "15:00",
      color: "dark",
      disabled: false
    },
    {
      time: "16:00",
      color: "dark",
      disabled: false
    },
    {
      time: "17:00",
      color: "dark",
      disabled: false
    },
    {
      time: "18:00",
      color: "dark",
      disabled: true
    }
  ]
  

  ngOnInit() {
  }


  resetColorTime() {
    this.times1 = [
      {
        time: "07:00",
        color: "dark",
        disabled: false
      },
      {
        time: "08:00",
        color: "dark",
        disabled: false
      },
      {
        time: "09:00",
        color: "dark",
        disabled: false
      },
      {
        time: "10:00",
        color: "dark",
        disabled: false
      }
    ]
    
    this.times2 = [
      {
        time: "11:00",
        color: "dark",
        disabled: false
      },
      {
        time: "12:00",
        color: "dark",
        disabled: false
      },
      {
        time: "13:00",
        color: "dark",
        disabled: false
      },
      {
        time: "14:00",
        color: "dark",
        disabled: false
      }
    ]
  
    this.times3 = [
      {
        time: "15:00",
        color: "dark",
        disabled: false
      },
      {
        time: "16:00",
        color: "dark",
        disabled: false
      },
      {
        time: "17:00",
        color: "dark",
        disabled: false
      },
      {
        time: "18:00",
        color: "dark",
        disabled: true
      }
    ]
  }


  segmentChanged($event){
    console.log($event.detail.value)
  }

  timeActionClick(row, times) {
    this.resetColorTime();
    let extra = false;
    switch (row) {
      case 1:
        extra = false;
        if(times.time == "10:00") {
          this.times2.forEach(item => {
            if(item.time == "11:00") {
              item.color = "warning";
            }
          });
        }
        this.times1.forEach(time => {
          if(extra) {
            time.color = "warning";
            extra = false;
          }
          if(time.time == times.time) {
            time.color = "warning";
            extra = true;
          }
        });
        break;
    
      case 2:
        extra = false;
        if(times.time == "14:00") {
          this.times3.forEach(item => {
            if(item.time == "15:00") {
              item.color = "warning";
            }
          });
        }
        this.times2.forEach(time => {
          if(extra) {
            time.color = "warning";
            extra = false;
          }
          if(time.time == times.time) {
            time.color = "warning";
            extra = true;
          }
        });
        break;

      case 3:
        extra = false;
        this.times3.forEach(time => {
          if(extra) {
            time.color = "warning";
            extra = false;
          }
          if(time.time == times.time) {
            time.color = "warning";
            extra = true;
          }
        });
        break;

      default:
        break;
    }


  }

  navigateTo(page) {
    switch (page) {
      case 'user':
        this.router.navigateByUrl('/user');
      break;


      default:
        break;
    }
  }

}
