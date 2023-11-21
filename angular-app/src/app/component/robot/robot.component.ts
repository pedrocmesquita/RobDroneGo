import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IRobot } from "../../models/irobot.model";
import { RobotService } from "../../services/robot.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.css',
})
export class RobotComponent implements OnInit{

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
    active: false,
  };
  successMessage: string | null = null;
  constructor(private robotService:RobotService) { }

  ngOnInit(): void {
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

  createRobot(): void {
    this.robotService.createRobot(this.newRobot).subscribe(
      (robot) => {
        this.robots.push(robot);
        this.newRobot = {
          idRobot: '',
          robotName: '',
          typeId: '',
          serialNumber: '',
          description: '',
          active: false,
        };
        this.successMessage = 'Robot created successfully!';
      },
      (error) => {
        console.error('Failed to create robot:', error);
        this.successMessage = null;
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
        console.error('Failed to update robot:', error);
        this.successMessage = null;
      }
    );
  }
}
