import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtifactService } from '../../../services/artifact.service';
import { ExcavationSiteService } from '../../../services/excavation-site.service';
import { ExcavationSite } from '../../../types/excavation-site';
import { ArtifactCategoryService } from '../../../services/artifact-category.service';
import { ArtifactCategory } from '../../../types/artifact-category';
import { ArtifactMaterialService } from '../../../services/artifact-material.service';
import { ArtifactMaterial } from '../../../types/artifact-material';
import { Artifact } from '../../../types/artifact';

@Component({
  selector: 'app-artifact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './artifact-form.component.html',
  styleUrl: './artifact-form.component.css'
})
export class ArtifactFormComponent {
    formBuilder=inject(FormBuilder);
    artifactForm=this.formBuilder.group({
    artifactId:[null],
    artifactName: ['',[Validators.required]],
    width: [''],
    height: [''],
    artifactLatitude:['',[Validators.required]],
    artifactLongitude:['',[Validators.required]],
    isDeleted: [false],
    artifactMaterialId: [null,[Validators.required]],
    artifactCategoryId: [null,[Validators.required]],
    excavationSiteId:[null,[Validators.required]],
  });

    router=inject(Router);
    route=inject(ActivatedRoute);
    artifactService=inject(ArtifactService);         
    siteService=inject(ExcavationSiteService);
    siteList:ExcavationSite[]=[]; 
    categoryService=inject(ArtifactCategoryService);
    categoryList:ArtifactCategory[]=[];
    materialService=inject(ArtifactMaterialService);
    materialList:ArtifactMaterial[]=[];

isEdit=false;

ngOnInit(){
let id=this.route.snapshot.params['id'];//burdaki id route daki id 
console.log(id);
if(id){
  this.isEdit=true;
  this.artifactService.getArtifactById(+id).subscribe(result=>{
    this.artifactForm.patchValue(result as any);
  })
}
 
this.materialService.getMaterialList().subscribe(result=>{
  this.materialList=result;
 });
 this.siteService.getExcavationSiteList().subscribe(result => {
  this.siteList = result;
});
this.categoryService.getCategoryList().subscribe(result => {
  this.categoryList = result;
});
}

create(){
  console.log(this.artifactForm.value)
  let model:any=this.artifactForm.value;
  this.artifactService.addArtifacts(model as Artifact).subscribe(()=>{
    alert("artifact created")
    this.router.navigateByUrl("/admin/artifact");
  })
}

update()
{
  console.log(this.artifactForm.value)
  let model:any=this.artifactForm.value;
  this.artifactService.updateArtifacts(this.artifactForm.value.artifactId!,model as Artifact).subscribe(()=>{
    alert("artifact updated")
    this.router.navigateByUrl("/admin/artifact");
})
}

trackById(index: number, item: any): number {
  return item.id;  
}
}
