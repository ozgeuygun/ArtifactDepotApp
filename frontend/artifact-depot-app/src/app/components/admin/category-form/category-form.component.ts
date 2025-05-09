import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtifactCategoryService } from '../../../services/artifact-category.service';
import { ArtifactCategory } from '../../../types/artifact-category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
    formBuilder=inject(FormBuilder);
    categoryForm=this.formBuilder.group({
    artifactCategoryId:[null],
    categoryName: ['',[Validators.required]],       
});

    router=inject(Router);
    route=inject(ActivatedRoute);   
    categoryService=inject(ArtifactCategoryService);
    categoryList:ArtifactCategory[]=[];

isEdit=false;

ngOnInit(){
  let id = this.route.snapshot.params['id'];
  console.log(id); 
  if (id) {
    this.isEdit = true;
    this.categoryService.getCategoryById(+id).subscribe(result => {
    console.log(result); 
    this.categoryForm.patchValue(result as any);  
    });
}
 
  this.categoryService.getCategoryList().subscribe(result=>{
  this.categoryList=result;
 });

}

create(){
  console.log(this.categoryForm.value);
  let model:any=this.categoryForm.value;
  this.categoryService.addCategory(model as ArtifactCategory).subscribe(()=>{
  alert("Category added successfully")
  this.router.navigateByUrl("/admin/manage-category");
  });

}

update()
{
  console.log(this.categoryForm.value)
  let model:any=this.categoryForm.value;
  this.categoryService.updateCategory(this.categoryForm.value.artifactCategoryId!,model as ArtifactCategory).subscribe(()=>{
  alert("material updated")
  this.router.navigateByUrl("/admin/manage-category");

});
}

trackById(index: number, item: any): number {
  return item.id;  
}
}
