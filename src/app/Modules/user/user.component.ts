import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'AS-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {


  rowData:any;
  columnDefs:any;
  user:any;
  /**
   *
   */
  constructor(

     private userService:UserService
  ) {
        
  }


  ngOnInit(): void {
    
    
    this.agGridInit();


  }


  getlist()
  {

    this.userService.getList().subscribe(res=>{

      this.rowData = res.data.items;

      console.log('getList ',res)
    },err =>{
      console.log(' errr',err)
    })
  }
  
  
  add(data:any)
  {

    var user:any = {};

    user.username="Ali";
    user.FirstName="sarı";
    user.LastName="sarı";
    user.Password="xvdgd4";
    user.Email="sar@gmail.com";

    this.user = user;
return;
    this.userService.add(user).subscribe(res=>{

      if(res.success)
      {
        this.getlist();
      }
      else
      {
        alert("hatalı \n " + res.message);
      }
      console.log(' Eklenen User: ',res)
    })
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
        this.getlist();
      }
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
        field: 'id', headerName: "Ayarlar", minWidth: 175, cellRenderer: 'agGridActionComponent'
      },
    ];
  }


}
