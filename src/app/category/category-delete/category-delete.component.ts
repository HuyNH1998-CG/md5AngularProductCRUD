import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categoryForm:FormGroup = new FormGroup({
    name: new FormControl(),
  })
  id!:number;

  constructor(private categoryService:CategoryService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      this.id = parseInt(paramMap.get('id')!);
      this.getCategory(this.id);
    })
  }

  ngOnInit(): void {
  }

  getCategory(id:number){
    return this.categoryService.findById(id).subscribe(category => {
      this.categoryForm = new FormGroup({
        name: new FormControl(category.name)
      })
    })
  }

  delete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(()=>{
      this.router.navigate(['/category/list'])
    },error => {console.log(error)})
  }
}
