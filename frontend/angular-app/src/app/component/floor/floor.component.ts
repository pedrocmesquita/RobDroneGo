import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IFloor } from "../../models/ifloor.model";
import { FloorService } from "../../services/floor.service";
import { FormsModule } from "@angular/forms";
import { BuildingService } from "../../services/building.service";
import { IBuilding } from "../../models/ibuilding.model";

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent implements OnInit{

  floorOptions = Array.from({length: 10}, (_, i) => i + 1);
  areFloorsFiltered: boolean = false;
  selectedOption: string = '';
  selectedFloor: IFloor | null = null;
  buildings: IBuilding[] = [];
  floors: IFloor[] = [];
  filteredFloors: IFloor[] = [];
  filterText: string = '';
  newFloor: IFloor = {
    buildingId: '',
    floorNumber: 0,
    floorDescription: '',
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private floorService:FloorService, private buildingService:BuildingService) { }

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    });

    this.floorService.getFloors().subscribe(
      (floors) => {
        console.log(floors);
        this.floors = floors;
        this.filteredFloors = floors;
      },
      (error) => {
        console.error('Failed to fetch floors:', error);
      }
    );
  }


  filterFloors(): void {
    if (this.filterText) {
      // @ts-ignore
      this.filteredFloors = this.floors.filter(floor => floor.floorId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredFloors = this.floors;
    }
  }

  filterFloorsWithConnections(): void {
    if (this.areFloorsFiltered) {
      // If the floors are currently filtered, reset the floors to the original list
      this.filteredFloors = this.floors;
      this.areFloorsFiltered = false;
    } else {
      // If the floors are not currently filtered, filter the floors
      this.filteredFloors = this.filteredFloors.filter(floor => floor.connections && floor.connections.length > 0);
      this.areFloorsFiltered = true;
    }
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  createFloor(): void {
    this.floorService.createFloor(this.newFloor).subscribe(
      (floor) => {
        this.floors.push(floor);
        this.newFloor = {
          buildingId: '',
          floorNumber: 0,
          floorDescription: '',
        };
        this.successMessage = 'Floor created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create floor:', error);
        this.errorMessage = 'Failed to create floor!';
      }
    );
  }

  editFloor(floor: IFloor): void {
    this.selectedFloor = floor;
    this.updateFloor(this.selectedFloor)
  }

  updateFloor(floor: IFloor): void {
    console.log('Updating floor:', floor);
    this.floorService.updateFloor(floor).subscribe(
      (floor) => {
        this.selectedFloor = null;
        this.successMessage = 'Floor updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;
        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to update floor:', error);
        this.errorMessage = 'Failed to update floor!';
      }
    );
  }
}
