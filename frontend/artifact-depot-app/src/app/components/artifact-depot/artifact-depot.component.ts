import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArtifactService } from '../../services/artifact.service';
import { Artifact } from '../../types/artifact';
import { DepotService } from '../../services/depot.service';
import { DepotDetailService } from '../../services/depot-detail.service';
import { Depot } from '../../types/depot';
import { DepotDetail } from '../../types/depot-detail';
import L from 'leaflet';

@Component({
  selector: 'app-artifact-depot',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './artifact-depot.component.html',
  styleUrl: './artifact-depot.component.css'
})
export class ArtifactDepotComponent {
  constructor(private router: Router) {}
    artifactService=inject(ArtifactService);    
    artifactList:Artifact[]=[];    
    
    depotService=inject(DepotService);
    depotList:Depot[]=[];
      
    detailService=inject(DepotDetailService);
    detailList:DepotDetail[]=[];
  
 ngOnInit(){
    this.artifactService.getAllArtifacts().subscribe(result => {
    this.artifactList = result;
    });
    this.depotService.getAllDepot().subscribe(result => {
    this.depotList = result;
    });
    this.detailService.getAllDetails().subscribe(result => {
      this.detailList = result;
      });
    }

 goToMap(element: any): void {
  const dLatitude = this.getDepotName(element.depotId)?.depotLatitude;
  const dLongitude = this.getDepotName(element.depotId)?.depotLongitude;
  const depotName = this.getDepotName(element.depotId)?.depotName;

  if (dLatitude && dLongitude) {
    this.router.navigate(['/map-view'], {
      queryParams: {
        lat: dLatitude,
        lng: dLongitude,
        name: depotName
      }
    });
  }
}
   
    getArtifactName(artifactId: number): Artifact | undefined {
      return this.artifactList.find(o => o.artifactId === artifactId);
    }
    getDepotName(depotId: number): Depot | undefined {
      return this.depotList.find(o => o.depotId === depotId);
    }
     
   trackById(index: number, item: any): number {
    return item.id;  
  }

}
