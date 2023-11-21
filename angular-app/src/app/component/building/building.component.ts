import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { IBuilding } from "../../models/ibuilding.model";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
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
    dimY: 0
  };
  successMessage: string | null = null;

  constructor(private buildingService: BuildingService) {}

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
        };
        this.successMessage = 'Building created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        console.error('Failed to create building:', error);
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
        console.error('Failed to update building:', error);
      }
    );
  }

}