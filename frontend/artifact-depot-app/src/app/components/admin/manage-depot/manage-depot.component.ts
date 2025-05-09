import { Component, inject } from '@angular/core';
import { Depot } from '../../../types/depot';
import { DepotService } from '../../../services/depot.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-depot',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-depot.component.html',
  styleUrl: './manage-depot.component.css'
})
export class ManageDepotComponent {

    depotService=inject(DepotService);
    depotList:Depot[]=[];
      
    ngOnInit(){
   
    this.depotService.getAllDepot().subscribe(result => {
    this.depotList = result;
    });
    }   
  
    getDepotName(depotDataId: number): Depot | undefined {
      return this.depotList.find(o => o.depotId === depotDataId);
    }
     
   trackById(index: number, item: any): number {
    return item.id;  
  }
}

    
   
  
