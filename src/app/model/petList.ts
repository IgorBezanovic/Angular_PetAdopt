import { Pet } from './pet.model';

export class PetSearchResult {
    count: number;
    results: Pet[];
  
    constructor(obj?: any) {
      this.count = obj && obj.count || 0;
      this.results = obj && obj.results.map(elem => { return new Pet(elem); }) || [];
    }
  }