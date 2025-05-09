import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';
import { ExcavationSiteService } from '../../services/excavation-site.service';
import { ArtifactMaterialService } from '../../services/artifact-material.service';
import L from 'leaflet';
import { ArtifactCategoryService } from '../../services/artifact-category.service';

@Component({
  selector: 'app-artifact-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artifact-map.component.html',
  styleUrl: './artifact-map.component.css'
})
export class ArtifactMapComponent {
  artifactService = inject(ArtifactService);
  materyalService = inject(ArtifactMaterialService);
  categoryService = inject(ArtifactCategoryService);

  artifactData: any[] = [];
  isDeletedArtifacts: any[] = [];
  materialInfo: any[] = [];
  categoryInfo: any[] = [];

  selectedMaterialId: number = -1;
  selectedCategoryId: number = -1;

  map!: L.Map;
  circles: L.Circle[] = [];

  ngOnInit(): void {
    this.artifactService.getAllArtifacts().subscribe((result) => {
      this.artifactData = result;
      this.isDeletedArtifacts = result;
      this.initMap();
    });

    this.materyalService.getMaterialList().subscribe((materials) => {
      this.materialInfo = materials;
    });

    this.categoryService.getCategoryList().subscribe((categories) => {
      this.categoryInfo = categories;
    });
  }

  initMap(): void {
    const mapElement = document.getElementById('map')!;
    this.map = L.map(mapElement).setView([38.9637, 35.2433], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.addCirclesToMap();
  }

  clearMap(): void {
    this.circles.forEach((circle) => circle.remove());
    this.circles = [];
  }

  filterArtifactsByMaterialId(materialId: number): void {
    this.selectedMaterialId = materialId;
    this.selectedCategoryId = -1;

    this.clearMap();
    this.isDeletedArtifacts = this.artifactData.filter(
      (artifact) => artifact.artifactMaterialId === materialId
    );
    this.addCirclesToMap();
  }

  filterArtifactsByCategoryId(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.selectedMaterialId = -1;

    this.clearMap();
    this.isDeletedArtifacts = this.artifactData.filter(
      (artifact) => artifact.artifactCategoryId === categoryId
    );
    this.addCirclesToMap();
  }

  showAllArtifacts(): void {
    this.selectedMaterialId = -1;
    this.selectedCategoryId = -1;
    this.clearMap();
    this.isDeletedArtifacts = this.artifactData;
    this.addCirclesToMap();
  }

  getMaterialColor(materialId: number): string {
    switch (materialId) {
      case 1: return 'orange';  
      case 2: return 'green';    
      case 3: return 'purple';  
      case 4: return 'cyan';    
      case 5: return 'brown';   
      default: return 'blue';
    }
  }

  getCategoryColor(categoryId: number): string {
    switch (categoryId) {
      case 1: return 'red';     
      case 2: return 'teal';     
      case 3: return 'gray';     
      case 4: return 'gold';     
      default: return 'black';
    }
  }

  addCirclesToMap(): void {
    this.isDeletedArtifacts.forEach((a) => {
      const lat = a.artifactLatitude;
      const lng = a.artifactLongitude;

      if (lat && lng) {
        const color = this.selectedMaterialId !== -1
          ? this.getMaterialColor(a.artifactMaterialId)
          : this.selectedCategoryId !== -1
            ? this.getCategoryColor(a.artifactCategoryId)
            : 'blue';

        const circle = L.circle([lat, lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: 5000
        })
          .addTo(this.map)
          .bindPopup(`<b>${a.artifactName}</b>`);

        this.circles.push(circle);
      }
    });
  }
}