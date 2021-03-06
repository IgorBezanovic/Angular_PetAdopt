import { Adoption } from './adoption.model';


export class AdoptionSearchResult {
    count: number;
    results: Adoption[];
  
    constructor(obj?: any) {
      this.count = obj && obj.count || 0;
      this.results = obj && obj.results.map(elem => { return new Adoption(elem); }) || [];
    }
  }