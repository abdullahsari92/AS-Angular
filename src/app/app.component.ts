import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuConfigService } from './core/services/menu-config.service';
import { MenuConfig } from './core/config/menu.config';
import { LocalStorageService } from './services/local-storage.service';
import { LanguagesService } from './services/languages.service';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'as-Angular';
	private unsubscribeLungages: Subject<any>;

  /**
   *
   */
  constructor(private menuConfigService:MenuConfigService,
    private localStorageService:LocalStorageService,
    private languagesService:LanguagesService,
    private cdf:ChangeDetectorRef

    ) {

      this.unsubscribeLungages = new Subject();


  }
  ngOnInit(): void {
		this.menuConfigService.loadConfigs(new MenuConfig().configs);

    this.setLocalStorageLanguages();

  }



  setLocalStorageLanguages() {	
		return new Promise((resolve, reject) => {
		if (this.isLanguagesVersionChange() || (this.localStorageService.getItem('languagesDefinitions') === null)) {
			this.languagesService
				.getList()
				.pipe(
					tap(res => {
						if (res.success) {	

							this.localStorageService.setItem("languagesDefinitions", res.data.items);
							this.localStorageService.setItem("langVersion", 10); //dilin version güncelleniyor.

							if (!this.localStorageService.getItem("language")) {						
								this.localStorageService.setItem("language", "tr");
							}
						}
					}), takeUntil(this.unsubscribeLungages), finalize(() => {
						this.cdf.markForCheck();
					})).subscribe()
		}
	})		
	}

  isLanguagesVersionChange(): boolean {
    var currentLanguages = this.localStorageService.getItem("langVersion");
var databaseLangVersion = 10;

if (!databaseLangVersion) {
  databaseLangVersion = 0
}
return currentLanguages !== databaseLangVersion;
}


}
