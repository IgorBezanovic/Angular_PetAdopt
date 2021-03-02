import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/pet.model';
import { PetsService } from '../service/pets.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PetSearchResult } from 'src/app/model/petList';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: PetSearchResult;

  parameters = {
    sort: "",
    filter: {
      category: '',
      sex:'',
    }
  }

  constructor(private service: PetsService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAll(this.parameters).subscribe(
      petSearchRes => { 
        this.pets = petSearchRes;
      }
    );
  }

  updateSex(sex){
    console.log(sex.target.id);
    this.parameters.filter.sex = sex.target.id;
    this.refresh()
  }
}


