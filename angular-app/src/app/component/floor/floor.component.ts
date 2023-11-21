import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IFloor } from "../../models/ifloor.model";
import { FloorService } from "../../services/floor.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent implements OnInit{

  selectedFloor: IFloor | null = null;
  floors: IFloor[] = [];
  filteredFloors: IFloor[] = [];
  filterText: string = '';
  newFloor: IFloor = {
    buildingId: '',
    floorNumber: 0,
    floorDescription: '',
  };
  successMessage: string | null = null;
  constructor(private floorService:FloorService) { }

  ngOnInit(): void {
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
      },
      (error) => {
        console.error('Failed to create floor:', error);
        this.successMessage = null;
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
        console.error('Failed to update floor:', error);
        this.successMessage = null;
      }
    );
  }
}
