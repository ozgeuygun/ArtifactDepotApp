import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArtifactService } from '../../../services/artifact.service';
import { Artifact } from '../../../types/artifact';
import { ExcavationSiteService } from '../../../services/excavation-site.service';
import { ArtifactMaterialService } from '../../../services/artifact-material.service';
import { ExcavationSite } from '../../../types/excavation-site';
import { ArtifactMaterial } from '../../../types/artifact-material';
import { ArtifactCategoryService } from '../../../services/artifact-category.service';
import { ArtifactCategory } from '../../../types/artifact-category';

@Component({
  selector: 'app-manage-artifact',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-artifact.component.html',
  styleUrl: './manage-artifact.component.css'
})
export class ManageArtifactComponent {
  
    artifactService=inject(ArtifactService);    
    artifactList:Artifact[]=[];    
    
    siteService=inject(ExcavationSiteService);
    siteList:ExcavationSite[]=[];
    
    categoryService=inject(ArtifactCategoryService);
    categoryList:ArtifactCategory[]=[];
    
    materialService=inject(ArtifactMaterialService);
    materialList:ArtifactMaterial[]=[];
    
   
    ngOnInit(){
    this.artifactService.getAllArtifacts().subscribe(result => {
    this.artifactList = result;
    });
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

    getMaterialName(materialId:number): ArtifactMaterial| undefined {
    return this.materialList.find(m=>m.artifactMaterialId===materialId);
    }
    getSiteName(siteId:number): ExcavationSite | undefined {
    return this.siteList.find(site=>site.excavationSiteId===siteId);
    }    
    getCategoryName(categoryId: number): ArtifactCategory | undefined {
      return this.categoryList.find(o => o.artifactCategoryId === categoryId);
    }
     
   trackById(index: number, item: any): number {
    return item.id;  
  }







    

}
