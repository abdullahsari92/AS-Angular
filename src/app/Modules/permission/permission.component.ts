import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'as-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})

export class PermissionComponent implements OnInit {


  rowData:any;
  columnDefs:any;
  user:any;
  /**
   *
   */
  constructor(

     private permissionService:PermissionService
  ) {
        
  }


  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getlist()
  {

    this.permissionService.getList().subscribe(res=>{

      this.rowData = res.data.items;

      console.log('getList ',res)
    },err =>{
      console.log(' errr',err)
    })
  }
  
 

  

  agGridInit() {

    this.getlist();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'firstName', headerName: "adi", minWidth: 130 },
      { field: 'lastName', headerName: "soyadi", minWidth: 130 },
      { field: 'email', headerName: "Email", minWidth: 130 },    
      { field: 'isApproved' ,   headerName:"adı",  minWidth: 150 ,cellRenderer:'agGridLang',},
      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' },],
        }
      },
    ];
  }


}
