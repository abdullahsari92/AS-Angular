// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
// Object-Path

export interface MenuOptions {
	scroll?: any;
	submenu?: any;
	accordion?: any;
	dropdown?: any;
}

/**
 * Configure menu
 */
@Directive({
	selector: '[ktMenu]',
	exportAs: 'ktMenu',
})
export class MenuDirective implements AfterViewInit {
	// Public propeties
	@Input() options: MenuOptions | undefined;
	// Private properites
	private menu: any;

	/**
	 * Directive Constructor
	 * @param el: ElementRef
	 */
	constructor(private el: ElementRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		console.log('this.el.nativeElement ',this.el.nativeElement)
		this.setupOptions();
		this.menu = new KTMenu(this.el.nativeElement, this.options);

		console.log(' this.menu',this.menu)
	}

	/**
	 * Return the menu
	 */
	getMenu() {


		return this.menu;
	}

	/**
	 * Setup menu options
	 */
	private setupOptions() {
		// init aside menu
		let menuDesktopMode = 'accordion';
		if (this.el.nativeElement.getAttribute('data-ktmenu-dropdown') === '1') {
			menuDesktopMode = 'dropdown';
		}

		if (this.options && this.options.submenu.desktop === 'object') {
			 this.options.submenu.desktop = menuDesktopMode;
		}
	}
}
