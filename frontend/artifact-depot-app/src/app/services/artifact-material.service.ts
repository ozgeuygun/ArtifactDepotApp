import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArtifactMaterial } from '../types/artifact-material';

@Injectable({
  providedIn: 'root'
})
export class ArtifactMaterialService {
  http=inject(HttpClient);
  constructor() { 

  }
  getMaterialList(){
    return this.http.get<ArtifactMaterial[]>("https://localhost:7100/api/ArtifactMaterial");
  }
  deleteMaterial(id:number){
    return this.http.delete("https://localhost:7100/api/ArtifactMaterial/"+id);
  }
  addMaterial(materialData :ArtifactMaterial){
    return this.http.post("https://localhost:7100/api/ArtifactMaterial",materialData);
  }
  getMaterialById(id:number){
    return this.http.get<ArtifactMaterial>("https://localhost:7100/api/ArtifactMaterial/"+id);
  }
  updateMaterial(id:number,materialData :ArtifactMaterial){
  return this.http.put("https://localhost:7100/api/ArtifactMaterial/"+id,materialData);
  }

}
