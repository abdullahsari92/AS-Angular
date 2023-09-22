import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { AddComponent } from './add/add.component';
import { finalize, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'as-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  rowData:any;
  columnDefs:any;
  user:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private dialog:MatDialog,
    private roleService:RoleService,
    private translate: TranslateService,

  ) {   

  }


  ngOnInit(): void {
   
    

this.agGridInit();


  }


  getList()
  {

    this.roleService.getList().subscribe(res=>{

      if(res.success)
      this.rowData = res.data.items;


    })
  }


  agGridInit() {

    this.getList();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'name', headerName: "adi", minWidth: 130 },
      { field: 'description', headerName: "desciption", minWidth: 130 },
      { field: 'level', headerName: "Email", minWidth: 130 },    
      { field: 'isApproved' ,   headerName:"adı",  minWidth: 150 ,cellRenderer:'agGridLang',},
      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent'
      },
    ];
  }

  add(data:any)
  {

    const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'900px', height:'80%',maxHeight:"700px"});

    dialogRef.afterClosed().subscribe((refData: any) => {

      this.getList();
      if (!refData) {
        //burada modal kapanıyor
        return;
      }
    });

  }

  
  deleteItem(data:any)
  {

        this.roleService.delete(data.id).pipe(tap((res:any)=>{
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
