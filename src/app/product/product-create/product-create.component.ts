import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required)
  })

  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory()
  }
  get form(){
    return this.productForm.controls;
  }

  getCategory(){
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    })
  }
  submit(){
    if(this.productForm.invalid){
      alert("Invalid Data detected")
      return
    }
    const product = this.productForm.value;
    console.log(product)
    this.productService.saveProduct(product).subscribe(()=>{
      this.productForm.reset()
      this.router.navigate(['/product/list'])
    });
  }

}
