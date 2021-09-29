import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []
  constructor(public productService: ProductService,
              private categoryService: CategoryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productService.getAll().subscribe(products =>{
      this.products = products
    });
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories
    })
  }

  delete(id:number){
    return this.productService.deleteProduct(id).subscribe(()=>{
      this.toastr.success('Product removed','')
      this.getAll();
    });
  }

}
