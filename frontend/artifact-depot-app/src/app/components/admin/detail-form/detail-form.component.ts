import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotDetailService } from '../../../services/depot-detail.service';
import { DepotDetail } from '../../../types/depot-detail';
import { Depot } from '../../../types/depot';
import { DepotService } from '../../../services/depot.service';
import { ArtifactService } from '../../../services/artifact.service';
import { Artifact } from '../../../types/artifact';

@Component({
  selector: 'app-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.css'
})
export class DetailFormComponent {
    formBuilder=inject(FormBuilder);
    detailForm=this.formBuilder.group({
    detailId:[null],
    shelf: ['',[Validators.required]],
    condition: ['',[Validators.required]],
    status: [false],
    artifactId: [null,[Validators.required]],
    depotId: [null,[Validators.required]],  
  });

    router=inject(Router);
    route=inject(ActivatedRoute);
    detailService=inject(DepotDetailService);   
    depotService=inject(DepotService);  
    depotList:Depot[]=[];
    artifactService=inject(ArtifactService);  
    artifactList:Artifact[]=[];
    
isEdit=false;

ngOnInit(){
let id=this.route.snapshot.params['id'];
console.log(id);
if(id){
  this.isEdit=true;
  this.detailService.getDetailById(+id).subscribe(result=>{
  this.detailForm.patchValue(result as any);
  })

}
  this.depotService.getAllDepot().subscribe(result=>{
  this.depotList=result;
 });
  this.artifactService.getAllArtifacts().subscribe(result => {
  this.artifactList = result;
});



}
create(){
  console.log(this.detailForm.value)
  let model:any=this.detailForm.value;
  this.detailService.addDetail(model as DepotDetail).subscribe(()=>{
  alert("depot created")
  this.router.navigateByUrl("/admin/manage-detail");
  })
}
update()
{
  console.log(this.detailForm.value)
  let model:any=this.detailForm.value;
  this.detailService.updateDetail(this.detailForm.value.depotId!,model as DepotDetail).subscribe(()=>{
  alert("depot updated")
  this.router.navigateByUrl("/admin/manage-detail");
})
}
trackById(index: number, item: any): number {
  return item.id; 
}
}
