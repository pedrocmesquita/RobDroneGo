import { Component, OnInit } from '@angular/core';
import { ElevatorService } from '../../services/elevator.service';
import { IElevator } from "../../models/ielevator.model";
import { FloorService } from "../../services/floor.service";
import { IFloor } from "../../models/ifloor.model";
import { BuildingService } from "../../services/building.service";
import { IBuilding } from "../../models/ibuilding.model";

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent implements OnInit {
  floorOptions = Array.from({length: 10}, (_, i) => i + 1);
  coordinateOptions = Array.from({length: 11}, (_, i) => i);

  selectedOption: string = '';
  selectedElevator: IElevator | null = null;
  selectedFloors: string[] = [];
  elevators: IElevator[] = [];
  buildings: IBuilding[] = [];
  filteredElevators: IElevator[] = [];
  filterText: string = '';
  floors: string[] = [];
  selectedBuildingId: string = '';
  newElevator: IElevator = {
    elevatorId: '',
    floorsAttended: '',
    elevatorBrand: '',
    elevatorModel: '',
    elevatorSerNum: '',
    elevatorDesc: '',
    currentFloor: 0,
    locationX: 0,
    locationY: 0
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private elevatorService: ElevatorService, private floorService:FloorService, private buildingService:BuildingService) {}

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    }
    );

    this.floorService.getFloors().subscribe((floors) => {
      this.floors = floors.map((floor: { floorId: string; }) => floor.floorId);
    }
    );

    this.elevatorService.getElevators().subscribe(
      (elevators) => {
        console.log(elevators);
        this.elevators = elevators;
        this.filteredElevators = elevators;
      },
      (error) => {
        console.error('Failed to fetch elevators:', error);
      }
    );
  }

  filterElevators(): void {
    if (this.filterText) {
      this.filteredElevators = this.elevators.filter(elevator => elevator.elevatorId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredElevators = this.elevators;
    }
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  createElevator(): void {
    console.log(this.selectedFloors);
    this.newElevator.floorsAttended = this.selectedFloors.join(',');
    this.elevatorService.createElevator(this.newElevator).subscribe(
      (elevator) => {
        this.elevators.push(elevator);
        this.newElevator = {
          elevatorId: '',
          floorsAttended: '',
          elevatorBrand: '',
          elevatorModel: '',
          elevatorSerNum: '',
          elevatorDesc: '',
          currentFloor: 0,
          locationX: 0,
          locationY: 0
        };
        this.successMessage = 'Elevator created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create elevator:', error);
        this.errorMessage = 'Failed to create elevator!';
      }
    );
  }

}
