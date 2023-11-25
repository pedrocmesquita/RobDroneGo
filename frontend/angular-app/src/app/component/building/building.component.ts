import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { IBuilding } from "../../models/ibuilding.model";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  floorOptions: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
  wallOptions: number[] = Array.from({ length: 15 }, (_, index) => index + 1);
  dimensionOptions: number[] = Array.from({ length: 11 }, (_, index) => index);


  selectedOption: string = '';
  minFloors: number = 1;
  maxFloors: number = 10;
  selectedBuilding: IBuilding | null = null;
  buildings: IBuilding[] = [];
  filteredBuildings: IBuilding[] = [];
  filterText: string = '';
  newBuilding: IBuilding = {
    buildingId: '',
    buildingName: '',
    buildingDescription: '',
    buildingNumberOfFloors: 0, // Initialize to 0 or another default value
    dimX: 0,
    dimY: 0,
    wallHeight: 0,
    wallWidth: 0
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private buildingService: BuildingService) {
  }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings) => {
        console.log(buildings);
        this.buildings = buildings;
        this.filteredBuildings = buildings;
      },
      (error) => {
        console.error('Failed to fetch buildings:', error);
      }
    );
  }


  filterBuildings(): void {
    if (this.filterText) {
      this.filteredBuildings = this.buildings.filter(building => building.buildingId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredBuildings = this.buildings;
    }
  }

  filterBuildingsByFloors() {
    this.filteredBuildings = this.buildings.filter(building =>
      building.buildingNumberOfFloors >= this.minFloors && building.buildingNumberOfFloors <= this.maxFloors
    );
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  createBuilding(): void {

    this.buildingService.createBuilding(this.newBuilding).subscribe(

      (building) => {
        this.buildings.push(building);
        this.newBuilding = {
          buildingId: '',
          buildingName: '',
          buildingDescription: '',
          buildingNumberOfFloors: 0,
          dimX: 0,
          dimY: 0,
          wallHeight: 0,
          wallWidth: 0
        };
        this.successMessage = 'Building created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create building:', error);
        this.errorMessage = 'Failed to create building!';
      }
    );
  }

  editBuilding(building: IBuilding): void {
    this.selectedBuilding = building;
    this.updateBuilding(this.selectedBuilding);
  }

  updateBuilding(building: IBuilding): void {
    console.log('Updating building:', building);
    this.buildingService.updateBuilding(building).subscribe(
      (updatedBuilding) => {
        this.selectedBuilding = null;
        this.successMessage = 'Building updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to update building:', error);
        this.errorMessage = 'Failed to update building!';
      }
    );
  }

}
