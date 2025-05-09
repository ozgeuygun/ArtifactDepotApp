import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotService } from '../../../services/depot.service';
import { Depot } from '../../../types/depot';

@Component({
  selector: 'app-depot-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './depot-form.component.html',
  styleUrl: './depot-form.component.css'
})
export class DepotFormComponent {
      formBuilder=inject(FormBuilder);
      depotForm=this.formBuilder.group({
      depotId:[null],
      depotName: ['',[Validators.required]],   
      depotLatitude:['',[Validators.required]],
      depotLongitude:['',[Validators.required]], 
      isActive: [false],
});

    router=inject(Router);
    route=inject(ActivatedRoute);   
    depotService=inject(DepotService);
    depotList:Depot[]=[];

isEdit=false;

ngOnInit(){
  let id = this.route.snapshot.params['id'];
  console.log(id);  
  if (id) {
    this.isEdit = true;
    this.depotService.getDepotById(+id).subscribe(result => {
    console.log(result);  
    this.depotForm.patchValue(result as any);  
    });

}
 
  this.depotService.getAllDepot().subscribe(result=>{
  this.depotList=result;
 });

}

create(){
  console.log(this.depotForm.value);
  let model:any=this.depotForm.value;
  this.depotService.addDepot(model as Depot).subscribe(()=>{
  alert("Depot added successfully")
  this.router.navigateByUrl("/admin/manage-depot");
  });

}
update()
{
  console.log(this.depotForm.value)
  let model:any=this.depotForm.value;
  this.depotService.updateDepot(this.depotForm.value.depotId!,model as Depot).subscribe(()=>{
  alert("depot updated")
  this.router.navigateByUrl("/admin/manage-depot");

});
}
trackById(index: number, item: any): number {
  return item.id; 
}
}
