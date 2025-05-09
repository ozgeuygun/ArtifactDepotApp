import { Component, inject } from '@angular/core';
import { ArtifactMaterialService } from '../../../services/artifact-material.service';
import { ArtifactMaterial } from '../../../types/artifact-material';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {

     formBuilder=inject(FormBuilder);
     materialForm=this.formBuilder.group({
     artifactMaterialId:[null],
     artifactMaterialName: ['',[Validators.required]],
      
});

    router=inject(Router);
    route=inject(ActivatedRoute);   
    materialService=inject(ArtifactMaterialService);
    materialList:ArtifactMaterial[]=[];

isEdit=false;

ngOnInit(){
  let id = this.route.snapshot.params['id'];
  console.log(id);  
  if (id) {
    this.isEdit = true;
    this.materialService.getMaterialById(+id).subscribe(result => {
    console.log(result); 
    this.materialForm.patchValue(result as any);  
    });

}
    this.materialService.getMaterialList().subscribe(result=>{
    this.materialList=result;
 });

}
create(){
  console.log(this.materialForm.value);
  let model:any=this.materialForm.value;
  this.materialService.addMaterial(model as ArtifactMaterial).subscribe(()=>{
  alert("Material added successfully")
  this.router.navigateByUrl("/admin/material");
  });

}
update()
{
  console.log(this.materialForm.value)
  let model:any=this.materialForm.value;
  this.materialService.updateMaterial(this.materialForm.value.artifactMaterialId!,model as ArtifactMaterial).subscribe(()=>{
  alert("material updated")
  this.router.navigateByUrl("/admin/material");

});
}
trackById(index: number, item: any): number {
  return item.id;  
}
}
