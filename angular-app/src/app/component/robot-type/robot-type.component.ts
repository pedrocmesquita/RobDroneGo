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

  createRobotType(): void {
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
      },
      (error) => {
        console.log(this.newRobotType);
        console.error('Failed to create robot type:', error);
        this.successMessage = null;
      }
    );
  }
}
