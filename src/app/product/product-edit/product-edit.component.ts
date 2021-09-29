import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required)
  })
  id!:number
  categories: Category[] = [];
  constructor(private productService:ProductService,
              private activedRoute:ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private toastr: ToastrService) {
    this.activedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.id = parseInt(paramMap.get('id')!);
      this.getProduct(this.id);
      this.getCategory();
    })
  }

  ngOnInit(): void {
  }

  get form(){
    return this.productForm.controls;
  }

  getProduct(id: number){
    return this.productService.findById(id).subscribe(product =>{
      this.productForm = new FormGroup({
        name: new FormControl(product.name,Validators.required),
        price: new FormControl(product.price,Validators.required),
        description: new FormControl(product.description,Validators.required),
        category: new FormControl(product.category,Validators.required)
      })
    })
  }

  getCategory(){
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    })
  }

  updateProduct(id:number){
    if(this.productForm.invalid){
      alert("Invalid Data detected")
      return
    }
    const product = this.productForm.value;
    this.productService.updateProduct(id,product).subscribe(()=>{
      this.router.navigate(['/product/list'])
    });

  }
}
