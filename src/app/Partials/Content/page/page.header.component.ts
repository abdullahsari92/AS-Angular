import { Component, Input } from '@angular/core';

@Component({
  selector: 'as-page-header',
	template: `

<div class="row header">

	<div class="pageTitle col-lg-9">
	{{ title | translate }}
	</div>

	<div class="col-3 col-xxl-3 col-lg-4 col-md-6 text-right" >
			<ng-content select="[asPageTools]"></ng-content>
	</div>
</div>

`,
  styleUrls: ['./page.header.component.scss'],
  //styles:['.as-page-header{background-color:red; padding:10px}']
})


export class PageHeaderComponent {

	@Input() title: string="";

	@Input() class: string | undefined;


}
