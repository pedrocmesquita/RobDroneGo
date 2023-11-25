import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IRobot } from "../../models/irobot.model";
import { RobotService } from "../../services/robot.service";
import { FormsModule } from "@angular/forms";
import { RobotTypeService } from "../../services/robot-type.service";
import { IRobotType } from "../../models/irobot-type.model";
import { bool } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.css',
})
export class RobotComponent implements OnInit{
  selectedOption: string = '';
  robotTypes: IRobotType[] = [];
  selectedRobot: IRobot | null = null;
  robots: IRobot[] = [];
  filteredRobots: IRobot[] = [];
  filterText: string = '';
  newRobot: IRobot = {
    idRobot: '',
    robotName: '',
    typeId: '',
    serialNumber: '',
    description: '',
    active: true,
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private robotService:RobotService, private robotTypeService:RobotTypeService) { }

  ngOnInit(): void {
    this.robotTypeService.getRobotTypes().subscribe((robotTypes) => {
      this.robotTypes = robotTypes;
    }
    );


    this.robotService.getRobots().subscribe(
      (robots) => {
        console.log(robots);
        this.robots = robots;
        this.filteredRobots = robots;
      },
      (error) => {
        console.error('Failed to fetch robots:', error);
      }
    );
  }


  filterRobots(): void {
    if (this.filterText) {
      // @ts-ignore
      this.filteredRobots = this.robots.filter(robot => robot.idRobot.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredRobots = this.robots;
    }
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  createRobot(): void {
    console.log('Creating robot:', this.newRobot);
    this.robotService.createRobot(this.newRobot).subscribe(
      (robot) => {
        this.robots.push(robot);
        this.newRobot = {
          idRobot: '',
          robotName: '',
          typeId: '',
          serialNumber: '',
          description: '',
          active: true,
        };
        this.successMessage = 'Robot created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create robot:', error);
        this.errorMessage = 'Failed to create robot!';
      }
    );
  }

  patchRobot(robot: IRobot): void {
    this.selectedRobot = robot;
    this.updateRobot(this.selectedRobot)
  }

  updateRobot(robot: IRobot): void {
    console.log('Updating robot:', robot);
    this.robotService.patchRobot(robot.idRobot, robot).subscribe(
      (robot) => {
        this.selectedRobot = null;
        this.successMessage = 'Robot updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to update robot:', error);
        this.errorMessage = 'Failed to update robot!';
      }
    );
  }
}
