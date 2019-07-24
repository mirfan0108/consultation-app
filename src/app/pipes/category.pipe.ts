import { Pipe, PipeTransform } from '@angular/core';
import { MiniServicesService } from '../services/mini-services.service';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Categories } from '../_types/categories';
import { ResponseCategories } from '../_types/response-format';


@Pipe({
  name: 'categoryTrans'
})
export class CategoryPipe implements PipeTransform {

  CategoriesObservable: Observable<Categories>;


  // categories: any = [];
  categories: Categories[];
  constructor(private api: MiniServicesService){
   this.api.getCategories().subscribe((res: ResponseCategories) => {
      // console.log(this.CategoriesObservable)
      console.log(res)
      this.categories = res.data
      // this.categories = res.data
      // this.val = res.data.category;
    })
    console.log(this.categories)
  }
  
  

  

  transform(value: any, args?: any): any{
    let choosenOne = "";
    console.log(this.categories)
    this.categories.forEach(category => {
      if(category._id == value){
        choosenOne = category.category
      }
    });
    
    return choosenOne;
  }

}
