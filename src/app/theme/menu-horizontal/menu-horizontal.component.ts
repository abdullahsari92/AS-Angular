// Angular
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Renderer2
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';

// Layout

import { MenuConfigService } from 'src/app/core/services/menu-config.service';
import { MenuOptions } from 'src/app/core/directives/menu.directive';
import { MenuHorizontalService } from 'src/app/core/services/menu-horizontal.service';
import { OffcanvasOptions } from 'src/app/core/directives/offcanvas.directive';
// HTML Class


@Component({
	selector: 'kt-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	styleUrls: ['./menu-horizontal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {
	// Public properties
	currentRouteUrl: any = '';

	rootArrowEnabled: boolean = true;

	menuOptions: MenuOptions = {
		submenu: {
			desktop: 'dropdown',
			tablet: 'accordion',
			mobile: 'accordion'
		},
		accordion: {
			slideSpeed: 200, // accordion toggle slide speed in milliseconds
			expandAll: false // allow having multiple expanded accordions in the menu
		},
		dropdown: {
			timeout: 50
		}
	};

	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-header-menu-wrapper',
		closeBy: 'kt_header_menu_mobile_close_btn',
		toggleBy: {
			target: 'kt_header_mobile_toggler',
			state: 'kt-header-mobile__toolbar-toggler--active'
		}
	};

	/**
	 * Component Conctructor
	 *
	 * @param el: ElementRef
	 * @param htmlClassService: HtmlClassService
	 * @param menuHorService: MenuHorService
	 * @param menuConfigService: MenuConfigService
	 * @param layoutConfigService: LayouConfigService
	 * @param router: Router
	 * @param render: Renderer2
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(
		private el: ElementRef,
	
		public menuHorService: MenuHorizontalService,
		private router: Router,
		private render: Renderer2,
		private cdr: ChangeDetectorRef
	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {

	}

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.currentRouteUrl = this.router.url;
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
				this.cdr.markForCheck();
			});
	}

	/**
	 * Return Css Class Name
	 * @param item: any
	 */
	getItemCssClasses(item:any) {
		let classes = 'kt-menu__item';

		if (item.submenu) {
			classes += ' kt-menu__item--submenu';
		}

		if (!item.submenu && this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--active kt-menu__item--here';
		}

		if (item.submenu && this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--open kt-menu__item--here';
		}

		if (item.resizer) {
			classes += ' kt-menu__item--resize';
		}

		const menuType = item.submenu?.type || 'classic';
		if (item.root && menuType === 'classic'	|| parseInt(item.submenu?.width, 10) > 0) {
			classes += ' kt-menu__item--rel';
		}

	

		if (item.icon) {
			classes += ' kt-menu__item--icon-only';
		}

		return classes;
	}

	/**
	 * Returns Attribute SubMenu Toggle
	 * @param item: any
	 */
	getItemAttrSubmenuToggle(item:any) {
		let toggle = 'hover';
		if (item.toggle === 'click') {
			toggle = 'click';
		} else if (item.submenu?.type === 'tabs') {
			toggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return toggle;
	}

	/**
	 * Returns Submenu CSS Class Name
	 * @param item: any
	 */
	getItemMenuSubmenuClass(item:any) {
		let classes = '';

		const alignment = item?.alignment || 'right';

		if (alignment) {
			classes += ' kt-menu__submenu--' + alignment;
		}

		const type = item?.type || 'classic';
		if (type === 'classic') {
			classes += ' kt-menu__submenu--classic';
		}
		if (type === 'tabs') {
			classes += ' kt-menu__submenu--tabs';
		}
		if (type === 'mega') {
			if (item?.width) {
				classes += ' kt-menu__submenu--fixed';
			}
		}

		if (item.pull) {
			classes += ' kt-menu__submenu--pull';
		}

		return classes;
	}

	/**
	 * Check Menu is active
	 * @param item: any
	 */
	isMenuItemIsActive(item:any): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}

	/**
	 * Check Menu Root Item is active
	 * @param item: any
	 */
	isMenuRootItemIsActive(item:any): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (item.submenu.columns) {
			for (const subItem of item.submenu.columns) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (typeof item.submenu[Symbol.iterator] === 'function') {
			for (const subItem of item.submenu) {
				const active = this.isMenuItemIsActive(subItem);
				if (active) {
					return true;
				}
			}
		}

		return false;
	}
}
