import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, IProductMaster } from 'src/app/products/interfaces/Products.interfaces';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.css']
})
export class GridProductComponent implements OnInit {

  @Input() visable:boolean;
  @Input() products:IProductMaster[];
  @Input() onPrint:Function;
  @Output() show:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() productSelected:EventEmitter<IProduct>=new EventEmitter<IProduct>();

  constructor() { }

  open(event:any){
    let contentPather:HTMLElement=event.path[3];
    contentPather.classList.toggle("extends")
  }

  SelectedProduct(product:IProductMaster){
    this.productSelected.emit({
      marca:product.Marca.name,
      name:product.name,
      _references:product._references,
      code:product.code,
      createdAt:product.createdAt,
      description:product.description,
      idProduct:product.idProduct,
      iva:product.iva,
      value:product.value,
      subValue:product.subValue,
      status:product.status,
      updatedAt:product.updatedAt,
      count:0
    })
    this.show.emit(false)
  }

  close(){
    this.show.emit(false)
  }

  ngOnInit(): void {
  }

}
