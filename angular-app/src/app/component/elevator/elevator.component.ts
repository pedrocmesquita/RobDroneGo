import { Component, OnInit } from '@angular/core';
import { ElevatorService } from '../../services/elevator.service';
import { IElevator } from "../../models/ielevator.model";

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent implements OnInit {
  selectedElevator: IElevator | null = null;
  elevators: IElevator[] = [];
  filteredElevators: IElevator[] = [];
  filterText: string = '';
  newElevator: IElevator = {
    elevatorId: '',
    floorsAttended: [''],
    elevatorBrand: '',
    elevatorModel: '',
    elevatorSerNum: '',
    elevatorDesc: '',
    currentFloor: 0,
    locationX: 0,
    locationY: 0
  };
  successMessage: string | null = null;

  constructor(private elevatorService: ElevatorService) {}

  ngOnInit(): void {
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

  createElevator(): void {
    this.elevatorService.createElevator(this.newElevator).subscribe(
      (elevator) => {
        this.elevators.push(elevator);
        this.newElevator = {
          elevatorId: '',
          floorsAttended: [''],
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
        console.error('Failed to create elevator:', error);
      }
    );
  }

}
