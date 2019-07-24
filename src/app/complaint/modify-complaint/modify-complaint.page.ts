import { Component, OnInit } from '@angular/core';
import { MiniServicesService } from 'src/app/services/mini-services.service';
import { ConselorService } from 'src/app/services/conselor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-complaint',
  templateUrl: './modify-complaint.page.html',
  styleUrls: ['./modify-complaint.page.scss'],
})
export class ModifyComplaintPage implements OnInit {

  categories: any;
  labelCategory = "Pilih Kategori";
  formComplaint = {
    category: '',
    information: '',
    story: '',

  }

  constructor(private apiCategories: MiniServicesService, private complaintApi: ConselorService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.complaintId)
    this.complaintApi.getComplainId(this.route.snapshot.params.complaintId)
    .subscribe((res: any) => {
      this.formComplaint.information = res.data.subyek
      this.formComplaint.story = res.data.story
      this.formComplaint.category = res.data.category_id
      this.labelCategory = res.data.category_id

      this.apiCategories.getCategories()
        .subscribe((resp: any) => {
          this.categories = resp.data
          resp.data.forEach(category => {
            if(this.formComplaint.category == category._id){
              // this.formComplaint.category = category._id
              this.labelCategory = category.category
            }
          });
        })
    })
  }

  selectedCategory($event) {
    let id = $event.detail.value;
    this.categories.forEach(category => {
      if(id == category._id){
        this.formComplaint.category = category._id
        this.labelCategory = category.category
      }
    });
  }

  navigateTo(page) {
    switch (page) {
      case 'back':
        this.router.navigateByUrl('complaint')
        break;
      default:
        break;
    }
  }

}
