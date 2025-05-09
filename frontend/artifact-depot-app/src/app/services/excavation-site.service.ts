import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExcavationSite } from '../types/excavation-site';

@Injectable({
  providedIn: 'root'
})
export class ExcavationSiteService {
 http=inject(HttpClient);
  constructor() { 

  }
   getExcavationSiteList(){
      return this.http.get<ExcavationSite[]>("https://localhost:7100/api/ExcavationSite");
    }
    deleteExcavationSite(id:number){
      return this.http.delete("https://localhost:7100/api/ExcavationSite/"+id);
    }
    addExcavationSite(excavationSite :ExcavationSite){
      return this.http.post("https://localhost:7100/api/ExcavationSite",excavationSite);
    }
    getExcavationSiteById(id:number){
      return this.http.get<ExcavationSite>("https://localhost:7100/api/ExcavationSite/"+id);
    }
    updateExcavationSite(id:number,excavationSite :ExcavationSite){
      return this.http.put("https://localhost:7100/api/ExcavationSite/"+id,excavationSite);
    }
}
