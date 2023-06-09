import { Component, Input } from '@angular/core';

@Component({
  selector: 'as-page-body',
	template: `

<div class="row ">

	<div class="col-lg-12 col-xxl-12 col-md-12"  style="background-color: white; padding: 20px 5px;" >
			<ng-content></ng-content>
	</div>
</div>

`,
 // styleUrls: ['./page.header.component.scss'],
  //styles:['.as-page-header{background-color:red; padding:10px}']
})


export class PageBodyComponent {

	//@Input() title: string="";

	@Input() class: string | undefined;


}
