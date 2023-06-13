import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

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
    private roleService:RoleService
  ) {   

  }


  ngOnInit(): void {
   
    

this.agGridInit();


  }


  getlist()
  {

    this.roleService.getList().subscribe(src=>{

this.rowData = src.data.list;


    })
  }


  agGridInit() {

    this.getlist();


    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'name', headerName: "adi", minWidth: 130 },
      { field: 'destciption', headerName: "soyadi", minWidth: 130 },
      { field: 'level', headerName: "Email", minWidth: 130 },    
      { field: 'isApproved' ,   headerName:"adı",  minWidth: 150 ,cellRenderer:'agGridLang',},
      {
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent', cellEditorParams: {
          values: [{ text: 'UPDATE', icon: 'created' },],
        }
      },
    ];
  }

  add(data:any)
  {

    //const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'450px', height:'80%',maxHeight:"600px"});

    // dialogRef.afterClosed().subscribe((refData: any) => {

    //   this.getList();
    //   if (!refData) {
    //     //burada modal kapanıyor
    //     return;
    //   }
    //});

  }

}
