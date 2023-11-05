import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { AddComponent } from './add/add.component';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'as-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  rowData:any;
  columnDefs:any;
  user:any;
	private unsubscribeData: Subject<any>;
  constructor(
    private dialog:MatDialog,
    private roleService:RoleService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private cdr: ChangeDetectorRef,


  ) {   
    this.unsubscribeData = new Subject();
  }


  ngOnInit(): void {
   
    

this.agGridInit();


  }


  getList()
  {

    this.roleService.getList().pipe(tap(res=>{  

      if(res.success)
      this.rowData = res.data.items;

      }),takeUntil(this.unsubscribeData),finalize(()=>{
        this.cdr.markForCheck();
  })).subscribe();

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

  edit(data:any)
  {

    var id = data.id ?? 0;

    this.router.navigate(['./detail/'+id], { relativeTo: this.activatedRoute });

    // const dialogRef = this.dialog.open(AddComponent, { data,minWidth:"340px",width:'900px', height:'80%',maxHeight:"700px"});

    // dialogRef.afterClosed().subscribe((refData: any) => {

    //   this.getList();
    //   if (!refData) {
    //     //burada modal kapanıyor
    //     return;
    //   }
    // });

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

        this.cdr.markForCheck();
          
        })).subscribe();


  }
  ngOnDestroy() {	
		this.unsubscribeData.next(null);
		this.unsubscribeData.unsubscribe();
	    }
}
