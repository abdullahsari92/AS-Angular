import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Model/Entity/user';
import { UserService } from 'src/app/services/user.service';
import { AddComponent } from './add/add.component';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TranslateService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'AS-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  rowData:any;
  columnDefs:any;
  user:User = new User();
	private unsubscribeData: Subject<any>;

  /**
   *
   */

  constructor(

     private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private dialog:MatDialog,
     private translate: TranslateService,
     private router: Router,
     private cdr: ChangeDetectorRef,


  ) {
    this.unsubscribeData = new Subject();

  }
  


  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getList()
  {

    this.userService.getList().pipe(tap(res=>{  

      if(res.success)
      this.rowData = res.data.items;

      }),takeUntil(this.unsubscribeData)
      ,finalize(()=>{
        this.cdr.markForCheck();
  })).subscribe();
  }
  
  
  editData(data:any)
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


    
  update()
  {

    var user:any = {};

    user.username="mustafaKatman";
    user.FirstName="Nuri";
    user.LastName="katman";
    user.Password="xvdgd4";
    user.Email="katman@gmail.com";
    user.Id="2880d032-ee50-40aa-8dd8-5a91560722a6";

    this.userService.update(user).subscribe(res=>{

      console.log(' Guncellenen User: ',res)

      if(res.success)

      {
        this.getList();
      }
    })

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
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent'
      },
    ];
  }
  deleteItem(data:any)
  {

        this.userService.delete(data.id).pipe(tap((res:any)=>{
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
