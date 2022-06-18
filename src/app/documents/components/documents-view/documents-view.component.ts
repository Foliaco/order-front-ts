import { Component, Input, OnInit, Output } from '@angular/core';
import { IHeaderDoc } from '../../interfaces/Headerdocs.interface';
import { IProduct } from '../../../products/interfaces/Products.interfaces';

@Component({
  selector: 'app-documents-view',
  templateUrl: './documents-view.component.html',
  styleUrls: ['./documents-view.component.css']
})
export class DocumentsViewComponent implements OnInit {

  constructor() { }
  @Input() DocumentSelect:IHeaderDoc;
  @Input() buttons:{name:string,color:string}[];
  json=JSON;
  parse=parseInt;


  ngOnInit(): void {

    //console.log(this.DocumentSelect||'no hay nada')
  }

}
