import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetSearchResult } from 'src/app/model/petList';
import { Pet } from 'src/app/model/pet.model';
import { map } from 'rxjs/operators';
import { Adoption } from 'src/app/model/adoption.model';
import { AdoptionSearchResult } from 'src/app/model/adoptionSearchResult';

const baseUrl = "http://localhost:3000/api/pets";
const adoptUrl = "http://localhost:3000/api/adoptions";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http :HttpClient) { }

  getAll(parameters? :any) :Observable<PetSearchResult>{
    let queryParams = {};
    if(parameters) {
      queryParams = {
        params : new HttpParams()
        .set("sort", parameters.sort || "")
        .set('filter', parameters.filter && JSON.stringify(parameters.filter) || "")
      }
    }

    return this.http.get(baseUrl, queryParams).pipe(map( 
      response => { return new PetSearchResult(response); }
    ));
  }

  getPet(id: number) :Observable<Pet>{
    return this.http.get(baseUrl + "/" + id ).pipe(map( data => {
      return new Pet(data);
    }));
  }

  getAdopters() :Observable<AdoptionSearchResult>{
    return this.http.get(adoptUrl).pipe(map( data => {
      return new AdoptionSearchResult(data);
    }));
  }

  saveAdopter(adopt: Adoption): Observable<Adoption> {
    return this.http.post(adoptUrl, adopt).pipe(map(res => {
      return new Adoption(res);
    }));
  }
  
  remove(id :number) :Observable<Adoption>{
    return this.http.delete(adoptUrl + "/" + id).pipe(map(
      response => { return new Adoption(response); }
    ));
  }
}
