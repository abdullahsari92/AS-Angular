// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './directives/menu.directive';
import { OffcanvasDirective } from './directives/offcanvas.directive';



@NgModule({
	imports: [CommonModule],
	declarations: [


		MenuDirective,
		OffcanvasDirective

	],
	exports: [
		MenuDirective,
		OffcanvasDirective

	],
	providers: []
})
export class CoreModule {
}
