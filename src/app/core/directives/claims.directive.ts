import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[authIf]',
})
export class ClaimsAuth {

  @Input() authIf: string = "";

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private authService:AuthService
  ) {}

  ngOnInit(): void {

    console.log(' authIfauthIf',this.authIf)
   if (this.authService.checkClaim(this.authIf)) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
