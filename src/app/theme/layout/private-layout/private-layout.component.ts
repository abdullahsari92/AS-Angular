import { trigger, state, style, transition, animate } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/Model/tokenModel';
import { TutoriolModel } from 'src/app/Model/tutoriolModel';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { IdentityService } from 'src/app/services/identity.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MenuSubjectService } from 'src/app/services/subject/menu-subject.service';
import { TranslateService } from 'src/app/services/translate.service';
import { UserService } from 'src/app/services/user.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({     
        opacity: 1, 
        // height:'auto',
        overflow:'display'
      })),
      state('closed', style({
        opacity: 0,   
        height:'0'  ,
        overflow:'hidden'
      })),
      transition('open => closed', [
       
      ]),
      transition('closed => open', [
        animate('0.7s')
      ]),
    ]),
  ],
  // encapsulation: ViewEncapsulation.None
})
export class PrivateLayoutComponent implements AfterViewInit, OnInit {
  searchText: string = "";
    istutoriol = false;
  headerMobilOpen:boolean=false;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: '../../../../assets/svg/260-united-kingdom.svg'
    },
    {
      lang: 'tr',
      name: 'Turkey',
      flag: '../../../../assets/svg/218-turkey.svg'
    },
    {
      lang: 'fr',
      name: 'French',
      flag: '../../../../assets/svg/195-france.svg'
    },
    {
      lang: 'de',
      name: 'German',
      flag: '../../../../assets/svg/162-germany.svg'
    },
  ];


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  appPadding: string = "14rem";
  isActiveSearch=false;
  companyList: any[] = [];
  tokenModel: TokenModel = new TokenModel();
  activeLanguage: any;
  isSearch = false;
 // @ViewChild('notification') elNotification!: ElementRef;
  @ViewChild('elementLang') elLanguages: any;
  //@ViewChild('elementContact') elContact: any;
  @ViewChild('elementSearch') elSearch: any;
  @ViewChild('elementFooter') elFooter: any;
  @ViewChild('elementProfile') elProfile: any;


  
  isNotification=false;

  tutoriolModel: TutoriolModel[] = [];
  constructor(private localStorageService: LocalStorageService,
    private identityService: IdentityService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private cdf: ChangeDetectorRef,
    public asSettingsService: AsSettingsService,
    private menuSubjectService:MenuSubjectService,


  ) {

 }


  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {

    this.getTokenModel();

    this.activeLanguage = this.languages.find(p => p.lang == 'tr')
   
}
  ngAfterViewInit(): void {

 

      var lang: TutoriolModel = {
        left: this.elLanguages.nativeElement.offsetLeft -340, 
        // top: this.elLanguages.nativeElement.offsetTop + this.elLanguages.nativeElement.offsetHeight, 
         top: 73 , 
        name: "elLanguages" ,
       order:1

       };    

    this.tutoriolModel.push(lang); 
    // ----- contact -------
    // var contact: TutoriolModel = {
    //   left: this.elContact.nativeElement.offsetLeft -350, 
    //   // top: this.elLanguages.nativeElement.offsetTop + this.elLanguages.nativeElement.offsetHeight, 
    //    top: 73 , 
    //   name: "elContact" ,
    //   order:3
    //  };    
    //  this.tutoriolModel.push(contact); 
         // ----- menu -------
    var menu: TutoriolModel = {
      left: "16rem" , 
      // top: this.elLanguages.nativeElement.offsetTop + this.elLanguages.nativeElement.offsetHeight, 
       top:200 , 
      name: "menu" ,
      order:2

     };    
     this.tutoriolModel.push(menu); 

    // --------------------------- search -------------------------
    var search: TutoriolModel = {
      left:  this.elSearch.nativeElement.offsetLeft +   (this.elSearch.nativeElement.offsetWidth/2) -250 , 
       top: 70,      
      name: "search" ,
      order:3

     };    
     this.tutoriolModel.push(search); 
     


  // --------------------------- profile -------------------------
  var profile: TutoriolModel = {
    left: this.elProfile.nativeElement.offsetLeft -250, 
     top: 80,      
    name: "elProfile" ,
    order:4

   };    

   this.tutoriolModel.push(profile); 

  // --------------------------- menu exten -------------------------
  var menuExpansion: TutoriolModel = {
    left: 267, 
     top: 15,      
    name: "menuExpansion" ,
    order:6

   };    

   this.tutoriolModel.push(menuExpansion); 
     



  }


  setLanguage(item: LanguageFlag) {
    this.localStorageService.setItem("langType", item.lang);
    this.translate.use(item.lang);
    this.activeLanguage = item;

    //this.cdf.detectChanges();



    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

  getTokenModel() {

    this.tokenModel = this.localStorageService.getItem("tokenModel") as TokenModel;


  }



  menuActive(index:any)
  {
    this.menuSubjectService.menuDegistir(index);
  }

 


  searchClose() {
    this.isSearch = false

    this.searchText = "";
  }
  search() {

    
  }
  getYetkiliSirket() {

    
  }


  

 
  basHarfLogo(username: string) {
    if (!username) return "";

    var name = username.split(" ");
    var nameHarf = name[0] ? name[0].substr(0, 1).toUpperCase() : "";
    var surnameHarf = name[1] ? name[1].substr(0, 1).toUpperCase() : "";
    return nameHarf + surnameHarf
  }



  getSettingMenu()
  {

      this.router.navigateByUrl('/');
    

  }
}
