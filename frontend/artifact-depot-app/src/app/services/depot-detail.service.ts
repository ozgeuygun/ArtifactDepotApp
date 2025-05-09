import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepotDetail } from '../types/depot-detail';

@Injectable({
  providedIn: 'root'
})
export class DepotDetailService {

http=inject(HttpClient);

  constructor() { 

  }
   
    getAllDetails(){
      return this.http.get<DepotDetail[]>("https://localhost:7100/api/DepotDetail");
    }
    addDetail(detailData:DepotDetail){
      return this.http.post("https://localhost:7100/api/DepotDetail",detailData);
    }
    getDetailById(id:number){
      return this.http.get<DepotDetail>('https://localhost:7100/api/DepotDetail/'+id);
    }
    updateDetail(id:number,detailData:DepotDetail){
      return this.http.put("https://localhost:7100/api/DepotDetail/"+id,detailData);
    }
}
