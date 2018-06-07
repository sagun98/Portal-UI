import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductComponentBase } from './../product.class';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProxyService } from '../../api/proxy.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-existing-product',
  templateUrl: './existing-product.component.html',
  styleUrls: ['./existing-product.component.scss']
})
export class ExistingProductComponent extends ProductComponentBase implements OnInit {

  public activeEditor: any = {
    apis : false,
    overview : false,
    description : false,
    title : false
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected formBuilder: FormBuilder,
    protected proxyService: ProxyService
  ) {
    super(activatedRoute, productService, formBuilder);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public getApiDefinition(api, isOpen: boolean) {
    
    if(! isOpen){
      this.activeApi = null;
      return;
    }

    this.proxyService.getProxyDefinition(api.id).subscribe(_api => {
      _api['id'] = _api['_id'];
      this.activeApi = _api;
    });
  }

  public save(editor: string) {
    this.activeEditor[editor] = ! this.activeEditor[editor];

    if(! this.activeEditor[editor])
      this.updateProduct(editor);
  }

  public saveContent(editor) {
    let override = false;
    const dirty = editor.editor.isDirty();

    if(! this.activeEditor[editor.editor.id] && dirty )
      override = confirm("You have unsaved changes.  Do you want to save your changes before you close the editor?");

    if(this.activeEditor[editor.editor.id] || override)
      this.updateProduct();
  }

  public updateProduct(editor?:string) {
    setTimeout(t => {
      this.submitted = true;

      if (this.form.invalid) {
        this.activeEditor[editor] = true;
        return;
      }

      const productData = this.form.getRawValue();

      this.productService.updateProduct(productData).subscribe((product: Product) => {
        this.product = product;
        //TODO: remove this
        this.product.id = product['_id'];
      });
    })
  }
}
