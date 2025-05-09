import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExcavationSiteService } from '../../../services/excavation-site.service';
import { ExcavationSite } from '../../../types/excavation-site';

@Component({
  selector: 'app-manage-site',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-site.component.html',
  styleUrl: './manage-site.component.css'
})
export class ManageSiteComponent {
    siteService=inject(ExcavationSiteService);
    siteList:ExcavationSite[]=[];
    
    ngOnInit(){
    this.siteService.getExcavationSiteList().subscribe(result => {
    this.siteList = result;
    });
    }

    getSiteName(siteId: number): ExcavationSite | undefined {
      return this.siteList.find(o => o.excavationSiteId === siteId);
    }
    
   trackById(index: number, item: any): number {
    return item.id;  
  }
}
