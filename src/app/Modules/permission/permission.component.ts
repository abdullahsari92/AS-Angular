import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionService } from 'src/app/services/permission.service';
import { AddComponent } from './add/add.component';
import { finalize, tap } from 'rxjs';
import { apiResult } from 'src/app/core/models/apiResult';
import Swal from 'sweetalert2';
import { TranslateService } from 'src/app/services/translate.service';

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
    private dialog: MatDialog,
    private translate: TranslateService,


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
  



  add(data:any)
  {

    const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'450px', height:'70%',maxHeight:"500px"});

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
      { field: 'name', headerName: this.translate.getValue("TEXT.Name"), minWidth: 130 },
      { field: 'controllerName', headerName: this.translate.getValue("TEXT.controllerName"), minWidth: 130 },
      { field: 'actionName', headerName: this.translate.getValue("TEXT.actionName"), minWidth: 130 },
      { field: 'description', headerName: this.translate.getValue("TEXT.description"), minWidth: 130 },    
      { field: 'isApproved' ,   headerName:this.translate.getValue("TEXT.isApproved"),  minWidth: 150 ,cellRenderer:'changeStatus'},
      {field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent'}
      
    ];
  }



  deleteItem(data:any)
  {

        this.permissionService.delete(data.id).pipe(tap((res:apiResult)=>{
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

        }),finalize(()=>{

          
        })).subscribe();


  }
}
