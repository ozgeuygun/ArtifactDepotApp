import { Component, inject } from '@angular/core';
import { ArtifactService } from '../../../services/artifact.service';
import { DepotService } from '../../../services/depot.service';
import { Artifact } from '../../../types/artifact';
import { Depot } from '../../../types/depot';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DepotDetailService } from '../../../services/depot-detail.service';
import { DepotDetail } from '../../../types/depot-detail';

@Component({
  selector: 'app-manage-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-detail.component.html',
  styleUrl: './manage-detail.component.css'
})
export class ManageDetailComponent {

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
