import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  })
  id!:number
  categories: Category[] = [];
  constructor(private productService:ProductService,
              private activedRoute:ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    this.activedRoute.paramMap.subscribe(async (paramMap:ParamMap)=>{
      this.id = parseInt(paramMap.get('id')!);
      this.getProduct(this.id);
      this.getCategory();
    })
  }

  ngOnInit(): void {
  }

  getProduct(id: number){
    return this.productService.findById(id).subscribe(product =>{
      this.productForm = new FormGroup({
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
        category: new FormControl(product.category?.name)
      })
    })
  }

  getCategory(){
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    })
  }

  delete(id:number){
    this.productService.deleteProduct(id).subscribe(()=>{
      this.router.navigate(['/product/list'])
    });

  }
}
