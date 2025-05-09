import { Component, inject } from '@angular/core';
import { ArtifactCategoryService } from '../../../services/artifact-category.service';
import { ArtifactCategory } from '../../../types/artifact-category';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent {
  
    categoryService=inject(ArtifactCategoryService);
    categoryList:ArtifactCategory[]=[];
    
    ngOnInit(){
   
    this.categoryService.getCategoryList().subscribe(result => {
    this.categoryList = result;
    });
    }
   
    getCategoryName(categoryId: number): ArtifactCategory | undefined {
      return this.categoryList.find(o => o.artifactCategoryId === categoryId);
    }
     
   trackById(index: number, item: any): number {
    return item.id;  
  }

}
