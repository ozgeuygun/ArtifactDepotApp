import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Artifact } from '../types/artifact';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  http=inject(HttpClient);

  constructor() { 

  }
  getActiveArtifacts(){
    return this.http.get<Artifact[]>("https://localhost:7100/api/Artifact/active");
  }
  getAllArtifacts(){
    return this.http.get<Artifact[]>("https://localhost:7100/api/Artifact");
  }
  addArtifacts(artifactData:Artifact){
    return this.http.post("https://localhost:7100/api/Artifact",artifactData);
  }
  getArtifactById(id:number){
    return this.http.get<Artifact>('https://localhost:7100/api/Artifact/'+id);
  }
  updateArtifacts(id:number,artifactData:Artifact){
    return this.http.put("https://localhost:7100/api/Artifact/"+id,artifactData);
  }

}
