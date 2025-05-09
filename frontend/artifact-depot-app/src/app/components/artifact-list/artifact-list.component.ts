import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';
import { Artifact } from '../../types/artifact';
import { ExcavationSiteService } from '../../services/excavation-site.service';
import { ArtifactMaterialService } from '../../services/artifact-material.service';
import { ExcavationSite } from '../../types/excavation-site';
import { ArtifactMaterial } from '../../types/artifact-material';
import { ArtifactCategoryService } from '../../services/artifact-category.service';
import { ArtifactCategory } from '../../types/artifact-category';

@Component({
  selector: 'app-artifact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artifact-list.component.html',
  styleUrl: './artifact-list.component.css'
})
export class ArtifactListComponent {

  artifactService=inject(ArtifactService);
  isDeletedArtifacts!:Artifact[];      
  artifacts!: Artifact[];             
  
  siteService=inject(ExcavationSiteService);
  siteList:ExcavationSite[]=[];
  
  categoryService=inject(ArtifactCategoryService);
  categoryList:ArtifactCategory[]=[];
  
  materialService=inject(ArtifactMaterialService);
  materialList:ArtifactMaterial[]=[];
  
  materialFilter: number | null = null;  
  categoryFilter: number | null = null;  
  siteFilter: number | null = null;  
  siteLatitudeFilter: string | null = null;  
  siteLongitudeFilter: string | null = null;  
  artifactNameFilter: string | null = null;  
  artifactLatFilter: string | null = null;  
  artifactLonFilter: string | null = null; 

  applyArtifactNameFilter(event: any) {
    this.artifactNameFilter = event.target.value ? event.target.value.toLowerCase() : null;
    this.applyAllFilters();
  }
    
  applyArtifactLatitudeFilter(event: any) {
    this.artifactLatFilter = event.target.value ? event.target.value.toString() : null;
    this.applyAllFilters();
  }
  
  applyArtifactLongitudeFilter(event: any) {
    this.artifactLonFilter = event.target.value ? event.target.value.toString() : null;
    this.applyAllFilters();
  }
  
  applyMaterialFilter(event: any) {
    this.materialFilter = event.target.value ? Number(event.target.value) : null;
    this.applyAllFilters();
  
  }
  
  applyCategoryFilter(event: any) {
    this.categoryFilter = event.target.value ? Number(event.target.value) : null;
    this.applyAllFilters();
  }
  
  applySiteFilter(event: any) {
    this.siteFilter = event.target.value ? Number(event.target.value) : null;
    this.applyAllFilters();
  }
  
  applySiteLatitudeFilter(event: any) {
    this.siteLatitudeFilter = event.target.value ? event.target.value.toString() : null;
    this.applyAllFilters();
  }
  
  
  applySiteLongitudeFilter(event: any) {
    this.siteLongitudeFilter = event.target.value ? event.target.value.toString() : null;
    this.applyAllFilters();
  }
  
ngOnInit(){
  this.artifactService.getActiveArtifacts().subscribe((result) => {

    this.artifacts = result;  
    this.isDeletedArtifacts = [...this.artifacts];  
    console.log(this.isDeletedArtifacts);
    this.applyAllFilters();  
  });
  this.siteService.getExcavationSiteList().subscribe(result => {
    this.siteList = result;
  });
  this.categoryService.getCategoryList().subscribe(result => {
    this.categoryList = result;
  });
  this.materialService.getMaterialList().subscribe(result => {
    this.materialList = result;
  });
}

 
  resetFilters() {
    this.materialFilter = null;
    this.categoryFilter = null;
    this.siteFilter = null;
    this.siteLatitudeFilter = null;
    this.siteLongitudeFilter = null;
    this.artifactNameFilter=null;
    this.artifactLatFilter=null;
    this.artifactLonFilter=null;
    this.isDeletedArtifacts = [...this.artifacts];  
  }

 

getSiteName(siteId:number): ExcavationSite | undefined {
return this.siteList.find(site=>site.excavationSiteId===siteId);
}
getCategoryName(categoryId: number): ArtifactCategory | undefined {
return this.categoryList.find(c => c.artifactCategoryId === categoryId);
}
getMaterialName(materialId:number): ArtifactMaterial| undefined {
return this.materialList.find(m=>m.artifactMaterialId===materialId);
}

trackById(index: number, item: any): number {
return item.id;  
}


applyAllFilters() {
  this.isDeletedArtifacts = this.artifacts.filter(artifact => {
    const matchesMaterial = this.materialFilter ? artifact.artifactMaterialId === this.materialFilter : true;
    const matchesCategory = this.categoryFilter ? artifact.artifactCategoryId === this.categoryFilter : true;
    const matchesSite = this.siteFilter ? artifact.excavationSiteId === this.siteFilter : true; 
    const matchesArtifactName = this.artifactNameFilter ? 
    artifact.artifactName.toLowerCase().includes(this.artifactNameFilter.toLowerCase()) : true;

   
    const matchesArtifactLatitude = this.artifactLatFilter ? 
      artifact.artifactLatitude.toString().includes(this.artifactLatFilter) : true;
    const matchesArtifactLongitude = this.artifactLonFilter ? 
      artifact.artifactLongitude.toString().includes(this.artifactLonFilter) : true;

    const matchesLatitude = this.siteLatitudeFilter ? 
      this.getSiteName(artifact.excavationSiteId)?.siteLatitude.toString().includes(this.siteLatitudeFilter) : true;
    const matchesLongitude = this.siteLongitudeFilter ? 
      this.getSiteName(artifact.excavationSiteId)?.siteLongitude.toString().includes(this.siteLongitudeFilter) : true;

    return matchesMaterial && matchesCategory && matchesSite && matchesLatitude && matchesLongitude && matchesArtifactName && matchesArtifactLatitude && matchesArtifactLongitude;

  });
}

}
