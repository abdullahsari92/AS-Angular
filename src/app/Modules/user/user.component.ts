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
    
    
    this.getlist();

    this.agGridInit();
  }


  getlist()
  {

    this.userService.getList().subscribe(res=>{

      this.rowData = res.items;

      console.log('getList ',res)
    },err =>{
      console.log(' errr',err)
    })
  }

  
  
  add()
  {

    var user:any = {};

    user.username="Ali";
    user.FirstName="sarı";
    user.LastName="sarı";
    user.Password="xvdgd4";
    user.Email="sar@gmail.com";

    this.user = user;

    this.userService.add(user).subscribe(res=>{

      console.log(' Eklenen User: ',res)
    })
  }


    
  update()
  {

    var user:any = {};

    user.username="mustafaKatman";
    user.FirstName="mustafa";
    user.LastName="katman";
    user.Password="xvdgd4";
    user.Email="katman@gmail.com";


    this.userService.update(user).subscribe(res=>{

      console.log(' Guncellenen User: ',res)
    })
  }
  

  agGridInit() {
    this.columnDefs = [
      { field: 'id', headerName: "id", sortable: true, filter: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 70 },
      { field: 'aday_no', headerName: "aday_no", minWidth: 130 },
      { field: 'firstName', headerName: "adi", minWidth: 130 },
      { field: 'lastName', headerName: "soyadi", minWidth: 130 },
      { field: 'email', headerName: "Email", minWidth: 130 },    
   
    ];
  }


}
