import { Component, OnInit } from '@angular/core';
import { AdoptionSearchResult } from 'src/app/model/adoptionSearchResult';
import { PetsService } from 'src/app/pets/service/pets.service';
import { Adoption } from 'src/app/model/adoption.model';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {
  adopters: AdoptionSearchResult;
  adoption: Adoption[] = [];
  count :number = 0;

  constructor(private service: PetsService, ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getAdopters().subscribe(
      adoptionSearchRes => { 
        this.adoption = adoptionSearchRes.results;
        this.count = adoptionSearchRes.count;
        console.log("Broj usvajaca je: ", this.count)
      }
    );
  }

  addAdopt(adoption) {
    this.adopters.results.push(adoption);
    this.adopters.count += 1;
  }

  onDelete(id :number) :void{
    console.log('Deleting adopter ', id);
    this.service.remove(id).subscribe(
      adopt => { adopt._id }
    );
    this.refresh();
  }
}
