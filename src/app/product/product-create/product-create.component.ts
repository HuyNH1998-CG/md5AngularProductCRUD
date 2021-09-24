import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  })

  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory(){
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    })
  }
  submit(){
    const product = this.productForm.value;
    console.log(product)
    this.productService.saveProduct(product).subscribe(()=>{
      this.productForm.reset()
      this.router.navigate(['/product/list'])
    });
  }

}
