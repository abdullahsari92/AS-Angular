import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'as-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  /**
   *
   */
  constructor(
    private activatedRoute:ActivatedRoute,
  ) {   

  }


  ngOnInit(): void {
   
    

    this.activatedRoute.queryParams.subscribe((values)=>{
    
   
      console.log('language ',values) ;


   
    })
  }



}
