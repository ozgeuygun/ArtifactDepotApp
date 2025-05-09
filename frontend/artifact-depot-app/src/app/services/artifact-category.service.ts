import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArtifactCategory } from '../types/artifact-category';


@Injectable({
  providedIn: 'root'
})
export class ArtifactCategoryService {
  http=inject(HttpClient);
  constructor() { }

  getCategoryList(){
    return this.http.get<ArtifactCategory[]>("https://localhost:7100/api/ArtifactCategory");
  }
  deleteCategory(id:number){
    return this.http.delete("https://localhost:7100/api/ArtifactCategory/"+id);
  }
  addCategory(artifactCategory :ArtifactCategory){
    return this.http.post("https://localhost:7100/api/ArtifactCategory",artifactCategory);
  }
  getCategoryById(id:number){
    return this.http.get<ArtifactCategory>("https://localhost:7100/api/ArtifactCategory/"+id);
  }
  updateCategory(id:number,artifactCategory :ArtifactCategory){
    return this.http.put("https://localhost:7100/api/ArtifactCategory/"+id,artifactCategory);
  }
}
