import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SurveillanceTaskService } from "../../services/surveillanceTask.service";
import { PickUpAndDeliveryTaskService } from "../../services/pickUpAndDeliveryTask.service";
import { IPickupAndDeliveryTask } from "../../models/ipickupanddeliverytask.model";
import { ISurveillanceTask } from "../../models/isurveillancetask.model";
import { BuildingService } from "../../services/building.service";
import { FloorService } from "../../services/floor.service";
import { RoomService } from "../../services/room.service";
import { IBuilding } from "../../models/ibuilding.model";
import { IFloor } from "../../models/ifloor.model";
import { IRoom } from "../../models/iroom.model";
import { AuthService } from "../../services/auth.service";
import { ISurveillanceTaskView } from "../../models/isurveillancetaskview.model";
import { IPickupAndDeliveryTaskView } from "../../models/ipickupanddeliverytaskview.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  surveillanceTasks: ISurveillanceTask[] = [];
  pickUpAndDeliveryTasks: IPickupAndDeliveryTask[] = [];
  surveillanceTasksView: ISurveillanceTaskView[] = [];
  pickUpAndDeliveryTasksView: IPickupAndDeliveryTaskView[] = [];
  buildings: IBuilding[] = [];
  floors: IFloor[] = [];
  rooms: IRoom[] = [];
  createdAtSortAsc = true;
  updatedAtSortAsc = true;
  filterText: string = '';
  newSurveillanceTask: ISurveillanceTask = {
    clientEmail: '',
    surveillanceTaskId: '',
    contactNumber: '',
    building: '',
    floors: '',
    active: false,
  };
  newPickUpAndDeliveryTask: IPickupAndDeliveryTask = {
    clientEmail: '',
    pickupAndDeliveryTaskId: '',
    contactNumber: '',
    pickupRoom: '',
    deliveryRoom: '',
    pickupContact: '',
    deliveryContact: '',
    confirmationCode: '',
    description: '',
    active: false,
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedOption: string = '';
  filteredFloors: IFloor[] = []; // Initialize to empty array

  constructor(private surveillanceTaskService: SurveillanceTaskService, private pickUpAndDeliveryTaskService: PickUpAndDeliveryTaskService
  , private buildingService: BuildingService, private floorService: FloorService, private roomService: RoomService, private authService: AuthService) {}

  ngOnInit(): void {
    this.surveillanceTaskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);

        this.surveillanceTasksView = tasks;
      },
      (error) => {
        console.error('Failed to fetch surveillance tasks:', error);
      }
    );

    this.pickUpAndDeliveryTaskService.getTasks().subscribe(
      (tasks) => {
        console.log("--------------------");
        console.log(tasks);
        console.log("--------------------");
        this.pickUpAndDeliveryTasksView = tasks;
      },
      (error) => {
        console.error('Failed to fetch pickup and delivery tasks:', error);
      }
    );

    this.buildingService.getBuildings().subscribe(
      (buildings) => {
        console.log(buildings);
        this.buildings = buildings;
      },
      (error) => {
        console.error('Failed to fetch buildings:', error);
      }
    );

    this.floorService.getFloors().subscribe(
      (floors) => {
        console.log(floors);
        this.floors = floors;
      },
      (error) => {
        console.error('Failed to fetch floors:', error);
      }
    );

    this.roomService.getRooms().subscribe(
      (rooms) => {
        console.log(rooms);
        this.rooms = rooms;
      },
      (error) => {
        console.error('Failed to fetch rooms:', error);
      }
    );
  }

  getFloors() {
    this.floorService.getFloors().subscribe(data => {
      this.floors = data;
      this.filteredFloors = this.floors;
    });
  }

  onBuildingChange() {
    // Update the filteredFloors based on the selected building
    this.filteredFloors = this.buildings.find(b => b.buildingId === this.newSurveillanceTask.building)?.floors || [];
  }

  sortTasks(sortBy: string): void {
    if (sortBy === 'createdAt') {
      this.surveillanceTasksView.sort((a, b) => this.createdAtSortAsc ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime());
      this.pickUpAndDeliveryTasksView.sort((a, b) => this.createdAtSortAsc ? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime());
      this.createdAtSortAsc = !this.createdAtSortAsc; // Toggle the sort direction
    } else if (sortBy === 'updatedAt') {
      this.surveillanceTasksView.sort((a, b) => this.updatedAtSortAsc ? a.updatedAt.getTime() - b.updatedAt.getTime() : b.updatedAt.getTime() - a.updatedAt.getTime());
      this.pickUpAndDeliveryTasksView.sort((a, b) => this.updatedAtSortAsc ? a.updatedAt.getTime() - b.updatedAt.getTime() : b.updatedAt.getTime() - a.updatedAt.getTime());
      this.updatedAtSortAsc = !this.updatedAtSortAsc; // Toggle the sort direction
    }
  }

  createSurveillanceTask(): void {
    this.newSurveillanceTask.clientEmail = this.authService.getCurrentUserEmail();
    console.log(this.newSurveillanceTask);
    this.surveillanceTaskService.createTask(this.newSurveillanceTask).subscribe(
      (task) => {
        console.log(task);
        this.surveillanceTasks.push(task);
        this.newSurveillanceTask = {
          clientEmail: '',
          surveillanceTaskId: '',
          contactNumber: '',
          building: '',
          floors: '',
          active: false,
        };

        this.successMessage = 'Task created successfully.';
        this.errorMessage = null;
      },
      (error) => {
        console.error('Failed to create task:', error);
        this.errorMessage = 'Failed to create task.';
        this.successMessage = null;
      }
    );
  }

  createPickUpAndDeliveryTask(): void {
    this.newPickUpAndDeliveryTask.clientEmail = this.authService.getCurrentUserEmail();
    console.log(this.newPickUpAndDeliveryTask);
    this.pickUpAndDeliveryTaskService.createTask(this.newPickUpAndDeliveryTask).subscribe(
      (task) => {
        console.log(task);
        this.pickUpAndDeliveryTasks.push(task);

        this.newPickUpAndDeliveryTask = {
          clientEmail: '',
          pickupAndDeliveryTaskId: '',
          contactNumber: '',
          pickupRoom: '',
          deliveryRoom: '',
          pickupContact: '',
          deliveryContact: '',
          confirmationCode: '',
          description: '',
          active: false
        };

        this.successMessage = 'Task created successfully.';
        this.errorMessage = null;
      },
      (error) => {
        console.error('Failed to create task:', error);
        this.errorMessage = 'Failed to create task.';
        this.successMessage = null;
      }
    );
  }

selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  getInactivePickUpAndDeliveryTasks() {
    return this.pickUpAndDeliveryTasksView.filter(task => !task.active);
  }

  getInactiveSurveillanceTasks() {
    return this.surveillanceTasksView.filter(task => !task.active);
  }

  updateBoolSurveillanceTask(task: ISurveillanceTask): void {
    this.surveillanceTaskService.updateTask(task).subscribe(
      () => {
        console.log('Task approved successfully');
        // Update local state and display success message
      },
      error => {
        console.error('Failed to approve task:', error);
        // Display error message
      }
    );
  }

  updateBoolPickUpAndDeliveryTask(task: IPickupAndDeliveryTask): void {
    this.pickUpAndDeliveryTaskService.updateTask(task).subscribe(
      () => {
        console.log('Task approved successfully');
        // Update local state and display success message
      },
      error => {
        console.error('Failed to approve task:', error);
        // Display error message
      }
    );
  }



}
