import { Component, Input } from '@angular/core';

@Component({
  selector: 'as-page',
	template: `
		<div class="as-page" [ngClass]="class" #page>
	<ng-content></ng-content>
</div>
`,
 // styleUrls: ['./page.component.scss'],
  styles:['.as-page{padding:10px}']
})


export class PageComponent {


	@Input() class: string | undefined;


}
