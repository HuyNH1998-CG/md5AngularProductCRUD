import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', ),
    category: new FormControl('', [Validators.required])
  })

  validation_message = {
    name: [
      {type: 'required', message: 'Không được để trống'},
      {type: 'minlength', message: 'Tên phải dài ít nhất 5 ký tự' }
    ],
    price: [
      {type: 'required', message: 'Không được để trống'}
    ],
    description: [
      {type: 'required', message: 'Không được để trống'}
    ],
    category: [
      {type: 'required', message: 'Không được để trống'}
    ],
  }

  errmess:string = '';

  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCategory()
  }

  get form() {
    return this.productForm.controls;
  }

  getCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  submit() {
    if (this.productForm.invalid) {
      this.toastr.error('Invalid Data', 'Cannot Create:', {
        positionClass: 'toast-bottom-right',
        timeOut: 1500,
        extendedTimeOut: 1500
      })
    } else {
      const product = this.productForm.value;
      this.productService.saveProduct(product).subscribe(() => {
        this.toastr.success('Product created', '', {
          positionClass: 'toast-bottom-right',
          timeOut: 1500,
          extendedTimeOut: 1500
        })
        this.productForm.reset()
        this.router.navigateByUrl('/product')
      }, err => {
          console.log(err.error[0].defaultMessage)
        err.error.forEach((message:any)=>{
          this.toastr.error(message.defaultMessage,'Error:')
        })
      });
    }
  }
}
