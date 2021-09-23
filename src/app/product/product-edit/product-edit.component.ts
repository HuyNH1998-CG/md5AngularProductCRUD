import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm! :FormGroup;
  id!:number
  constructor(private productService:ProductService,
              private activedRoute:ActivatedRoute,
              private router: Router) {
    this.activedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.id = parseInt(paramMap.get('id')!);
      const product = this.getProduct(this.id)!;
      this.productForm = new FormGroup({
        id: new FormControl(product.id),
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
      })
    })
  }

  ngOnInit(): void {
  }

  getProduct(id: number){
    return this.productService.findById(id)
  }

  updateProduct(id:number){
    const product = this.productForm.value;
    this.productService.updateProduct(id,product);
    this.router.navigate(['/list'])
  }
}
