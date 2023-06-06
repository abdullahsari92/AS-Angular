import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/permission.service';
import { AddComponent } from './add/add.component';

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

     private permissionService:PermissionService,
    private dialog: MatDialog

  ) {
        
  }


  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getList()
  {

    this.permissionService.getList().subscribe(res=>{

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
