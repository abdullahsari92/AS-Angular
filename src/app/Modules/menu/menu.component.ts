import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MenuService } from 'src/app/services/menu.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'as-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [NodeService],

})
export class MenuComponent implements OnInit  {
  /**
   *
   */

  files!: TreeNode[];
  constructor(
    private menuService:MenuService,
    private nodeService:NodeService,
      private cdf:ChangeDetectorRef,
      private router: Router,
      private activatedRoute:ActivatedRoute,

  ) {

  }
  ngOnInit() {
    this.nodeService.getFiles().then((data) =>{

      this.files = data;
      this.cdf.markForCheck();
    });
} 
  getFiles()
  {

    this.menuService.getFiles().subscribe(res=>{

      console.log(' getFiles',res)
         this.files = res;

    })
  }


  
  edit(data:any)
  {
    this.router.navigate(['./detail/'+data.id], { relativeTo: this.activatedRoute });

  }

  onSelectionChange(event:any)
  {
console.log(' event',event)

// this.router.navigate(['./detail/'+event.key], { relativeTo: this.activatedRoute });


  }


  undoNodeChanges(node:any)
  {
    console.log(' node',node)
  }
}
