import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IRobotType } from "../../models/irobot-type.model";
import { RobotTypeService } from "../../services/robot-type.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrl: './robot-type.component.css',
})
export class RobotTypeComponent implements OnInit{

  taskCategoryTypes = [
    'Vigilance',
    'PickUpAndDelivery',
  ];

  selectedOption: string = '';
  selectedRobotType: IRobotType | null = null;
  robotTypes: IRobotType[] = [];
  filteredRobotTypes: IRobotType[] = [];
  filterText: string = '';
  newRobotType: IRobotType = {
    typeId: '',
    brand: '',
    model: '',
    taskCategory: '',
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private robotTypeService:RobotTypeService) { }

  ngOnInit(): void {
    this.robotTypeService.getRobotTypes().subscribe(
      (robotTypes) => {
        console.log(robotTypes);
        this.robotTypes = robotTypes;
        this.filteredRobotTypes = robotTypes;
      },
      (error) => {
        console.error('Failed to fetch robot types:', error);
      }
    );
  }


  filterRobotTypes(): void {
    if (this.filterText) {
      // @ts-ignore
      this.filteredRobotTypes = this.robotTypes.filter(robotType => robotType.typeId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredRobotTypes = this.robotTypes;
    }
  }
  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }
  createRobotType(): void {
    console.log("Creating robot type:", this.newRobotType);
    this.robotTypeService.createRobotType(this.newRobotType).subscribe(
      (robotType) => {
        this.robotTypes.push(robotType);
        this.newRobotType = {
          typeId: '',
          brand: '',
          model: '',
          taskCategory: '',
        };
        this.successMessage = 'Robot Type created successfully!';
        setTimeout(() => {
          this.successMessage = null;

        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create robot type:', error);
        this.errorMessage = 'Failed to create robot type';
      }
    );
  }
}
