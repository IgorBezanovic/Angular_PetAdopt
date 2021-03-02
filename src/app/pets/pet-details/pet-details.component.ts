import { Component, OnInit } from '@angular/core';
import { PetsService } from '../service/pets.service';
import { Adoption } from 'src/app/model/adoption.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pet } from 'src/app/model/pet.model';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petId: number;
  pet: Pet;

  adopter: Adoption;
  adopterForm: FormGroup;

  constructor(private service: PetsService, private route: ActivatedRoute, private fb: FormBuilder, private router :Router) { 
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe( 
      data => {
        this.petId = data.id;
        this.updatePage();
    });
  }

  updatePage(){
    this.service.getPet(this.petId).subscribe(
      data => {
        this.pet = data;
        console.log(this.pet);
      })
  }

  createForm(){
    this.adopterForm = this.fb.group({
      'name': ["", [Validators.required, Validators.minLength(2)]],
      'contact': ["", Validators.required],
    });
  }

  newAdopter() {
    let newAdoptUser :Adoption = new Adoption(this.adopterForm.value);
    newAdoptUser.petName = this.pet.name;
    newAdoptUser.petId = this.petId;

    this.service.saveAdopter(newAdoptUser).subscribe(
      data => {
      console.log("Added: ", JSON.stringify(data)); 
      this.router.navigate(['/adoptions']);
      this.adopterForm.reset();
 
    });
  }
}
