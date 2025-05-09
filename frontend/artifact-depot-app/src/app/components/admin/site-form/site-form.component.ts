import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcavationSiteService } from '../../../services/excavation-site.service';
import { ExcavationSite } from '../../../types/excavation-site';

@Component({
  selector: 'app-site-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './site-form.component.html',
  styleUrl: './site-form.component.css'
})
export class SiteFormComponent {

      formBuilder=inject(FormBuilder);
      siteForm=this.formBuilder.group({
      excavationSiteId:[null],
      siteName: ['',[Validators.required]],
      siteLatitude:['',[Validators.required]],
      siteLongitude:['',[Validators.required]],
});

      router=inject(Router);
      route=inject(ActivatedRoute);   
      siteService=inject(ExcavationSiteService);
      siteList:ExcavationSite[]=[];

      isEdit=false;

ngOnInit(){
  let id = this.route.snapshot.params['id'];
  console.log(id);  
  if (id) {
    this.isEdit = true;
    this.siteService.getExcavationSiteById(+id).subscribe(result => {
    console.log(result); 
    this.siteForm.patchValue(result as any);  
    });

}
 
  this.siteService.getExcavationSiteList().subscribe(result=>{
  this.siteList=result;
 });

}
create(){
  console.log(this.siteForm.value);
  let model:any=this.siteForm.value;
  this.siteService.addExcavationSite(model as ExcavationSite).subscribe(()=>{
    alert("Site added successfully")
    this.router.navigateByUrl("/admin/manage-site");
  });
}
update()
{
  console.log(this.siteForm.value)
  let model:any=this.siteForm.value;
  this.siteService.updateExcavationSite(this.siteForm.value.excavationSiteId!,model as ExcavationSite).subscribe(()=>{
    alert("site updated")
    this.router.navigateByUrl("/admin/manage-site");
});
}
trackById(index: number, item: any): number {
  return item.id;  
}
}
