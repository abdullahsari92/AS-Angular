import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LanguagesService } from 'src/app/services/languages.service';
import { AddComponent } from './add/add.component';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import Swal from 'sweetalert2';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from 'src/app/services/translate.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'as-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  rowData:any;
  columnDefs:any;
  user:any;
	private unsubscribeData: Subject<any>;

  /**
   *
   */
  constructor(

     private languagesService:LanguagesService,
    private dialog: MatDialog,
    private asSettingsService:AsSettingsService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,



  ) {
		this.unsubscribeData = new Subject();
        
  }
  
  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getList()
  {

    this.languagesService.getList().pipe(tap(res=>{
          
      if(res.success)
      {
        this.rowData = res.data.items;  
      }       

    }),takeUntil(this.unsubscribeData),finalize(()=>{
      this.cdr.markForCheck();
    })).subscribe();
  
 
  }

  add(data:any)
  {

    const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'550px', height:'80%',maxHeight:"600px"});

    dialogRef.afterClosed().subscribe((refData: any) => {

      this.getList();
      if (!refData) {
        //burada modal kapanıyor
        return;
      }
    });

  }

  agGridInit() {

    this.getList();


    this.columnDefs = [
      { field: 'id', headerName: "id",hide:true, width: 70 },
      { field: 'keyword', headerName: "keyword", minWidth: 130 , sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true,  },
      { field: 'tr', headerName: "Trükçe", minWidth: 130 },
      { field: 'en', headerName: "İngilizce", minWidth: 130 },    
      { field: 'de', headerName: "Almanca", minWidth: 130 },
      { field: 'es', headerName: "İspanyolca", minWidth: 130 },
      { field: 'fr', headerName: "Fransızca", minWidth: 130 },   
      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', 
      },
    ];
  }

//abdulah-test
  diller:any;
  addAll()
  {


    this.languagesService.getConfigAll().subscribe(res=>{
   
      res.forEach((element:any) => {
        
        element.keyword =  this.asSettingsService.TocamelCase(element.keyword)
      });

      this.languagesService.addAll(res).subscribe(res=>{

      });
    
    })
  }


  deleteItem(data:any)
  {

        this.languagesService.delete(data.id).pipe(tap((res:any)=>{
          if(res.success)
          {

              this.getList();
              Swal.fire({
                title: this.translate.getValue("TEXT.TRANSACTION_SUCCESSFUL"),
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
              })

          }

        }),takeUntil(this.unsubscribeData),finalize(()=>{

          
        })).subscribe();


  }

  ngOnDestroy() {
		//this.unsubscribe.forEach(sb => sb.unsubscribe());

    console.log("ngOnDestroy")
		this.unsubscribeData.next(null);
		this.unsubscribeData.unsubscribe();
	}
}
