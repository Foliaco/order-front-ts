import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsViewComponent } from './components/documents-view/documents-view.component';
import { FilterDocsComponent } from './components/filter-docs/filter-docs.component';
import { FormsModule } from '@angular/forms';
import { BarMenuDocsComponent } from './components/bar-menu-docs/bar-menu-docs.component';
import { FormDocumentComponent } from './components/form-document/form-document.component';
import { GridProductComponent } from '../shared/components/grid-product/grid-product.component';
import { ButtonsOptionsComponent } from './components/buttons-options/buttons-options.component';
import { OnlyNumberDirective } from '../shared/directives/only-number.directive';
import { LoadingComponent } from '../shared/components/loading/loading.component';



@NgModule({
  declarations: [
    FilterDocsComponent,
    DocumentsViewComponent,
    BarMenuDocsComponent,
    FormDocumentComponent,
    GridProductComponent,
    ButtonsOptionsComponent,
    LoadingComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  //exports:[LoadingComponent]
})
export class DocumentsModule { }
