import { TINYCMCE_CONFIG } from './../constants/tinymce.constant';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Subject } from 'rxjs';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { Product } from './interfaces/product.interface';

export class ProductComponentBase implements OnInit {

    public activeApi: any = null;
    public product: Product;
    public apis: any[];
    public form: FormGroup;
    public tinymceConfig = TINYCMCE_CONFIG;
    public errorClasses = ERROR_CLASSES;
    public submitted: boolean = false;
    public showOverview: boolean = false;
    public saveMethod: string = 'addProduct';

    protected $onProductSaved: Subject<Product> = new Subject<Product>();

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected productService: ProductService,
        protected formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.apis = data.apiData;
            this.saveMethod = data.saveMethod;
            this.product = <Product> data.product || <Product>{
                overview: ''
            };
            
            this.activeApi = {};
            this.showOverview = (this.product.overview && this.product.overview.length) ? true : false;
        });
        this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });
        this.buildForm();
    }

    protected buildForm() {
        this.form = this.formBuilder.group({
            id: [this.product.id],
            version : [this.product.version, []],
            name: [this.product.name, [Validators.required]],
            description: [this.product.description, [Validators.required]],
            overview: [this.product.overview],
            apis: [ this.product.apis , [Validators.required]]
        });
    }

    public saveProduct() {
        this.submitted = true;

        if(this.form.invalid){
            return;
        }

        if(! this.showOverview)
            this.form.get('overview').setValue('');

        const productData = this.form.getRawValue();

        this.productService[this.saveMethod](productData).subscribe(  (product: Product) => {
            this.$onProductSaved.next(product);
        });
    }
}
