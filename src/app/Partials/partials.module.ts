// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomAgGridComponent } from './ag-grid/custom-ag-grid/custom-ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { AgGridActionComponent } from './ag-grid/components-ag/ag-grid-action/ag-grid-action.component';
import { ChangeStatusComponent } from './ag-grid/components-ag/change-status/change-status.component';
import { FileViewerComponent } from './ag-grid/components-ag/file-viewer/file-viewer.component';
import { MaterialModule } from '../theme/material/material.module';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { FileUploadAllComponent } from './file-upload-all/file-upload-all.component';
import { TranslatePipe } from '../pipes/translate.pipe';

@NgModule({
	declarations: [
		AgGridActionComponent,
		ChangeStatusComponent,
		CustomAgGridComponent,
		ImgUploadComponent,
		FileUploadAllComponent,
		TranslatePipe
	],
	exports: [
		AgGridModule,
		CustomAgGridComponent,	
		TranslatePipe,
		ImgUploadComponent,
		FileUploadAllComponent,
		
	],
	imports: [
		CommonModule,
		MaterialModule,
		AgGridModule.withComponents([AgGridActionComponent,ChangeStatusComponent,FileViewerComponent])
	],
})
export class PartialsModule {
}
