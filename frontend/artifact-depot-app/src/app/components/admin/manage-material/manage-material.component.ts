import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArtifactMaterial } from '../../../types/artifact-material';
import { ArtifactMaterialService } from '../../../services/artifact-material.service';

@Component({
  selector: 'app-manage-material',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-material.component.html',
  styleUrl: './manage-material.component.css'
})
export class ManageMaterialComponent {
    materialService=inject(ArtifactMaterialService);
    materialList:ArtifactMaterial[]=[];
    
    ngOnInit(){
   
    this.materialService.getMaterialList().subscribe(result => {
    this.materialList = result;
    });

    }

    getMaterialName(materialId: number): ArtifactMaterial | undefined {
      return this.materialList.find(o => o.artifactMaterialId === materialId);
    }
  
   trackById(index: number, item: any): number {
    return item.id;  
  }
}
