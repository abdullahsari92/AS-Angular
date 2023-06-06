import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LanguagesService } from 'src/app/services/languages.service';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'as-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  rowData:any;
  columnDefs:any;
  user:any;
  /**
   *
   */
  constructor(

     private languagesService:LanguagesService,
    private dialog: MatDialog

  ) {
        
  }
  
  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getList()
  {

    this.languagesService.getList().subscribe(res=>{

      this.rowData = res.data.items;

      console.log('getList ',res)
    },err =>{
      console.log(' errr',err)
    })
  }
  
 

  addContact(data:any)
  {

    const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'450px', height:'80%',maxHeight:"600px"});

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
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'keyword', headerName: "keyword", minWidth: 130 },
      { field: 'tr', headerName: "Trükçe", minWidth: 130 },
      { field: 'en', headerName: "İngilizce", minWidth: 130 },    
      { field: 'de', headerName: "Almanca", minWidth: 130 },
      { field: 'se', headerName: "Email", minWidth: 130 },    

      { field: 'isApproved' ,   headerName:"adı",  minWidth: 150 ,cellRenderer:'agGridLang',},
      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' },],
        }
      },
    ];
  }
}
