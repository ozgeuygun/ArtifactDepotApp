import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Depot } from '../types/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  http=inject(HttpClient);
  constructor() { 

  }
    
      getAllDepot(){
        return this.http.get<Depot[]>("https://localhost:7100/api/Depot");
      }
      addDepot(depotData:Depot){
        return this.http.post("https://localhost:7100/api/Depot",depotData);
      }
      getDepotById(id:number){
        return this.http.get<Depot>('https://localhost:7100/api/Depot/'+id);
      }
      updateDepot(id:number,depotData:Depot){
        return this.http.put("https://localhost:7100/api/Depot/"+id,depotData);
      }
}
