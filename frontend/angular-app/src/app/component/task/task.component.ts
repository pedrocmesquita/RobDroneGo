import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SurveillanceTaskService } from "../../services/surveillanceTask.service";
import { PickUpAndDeliveryTaskService } from "../../services/pickUpAndDeliveryTask.service";
import { IPickupAndDeliveryTask } from "../../models/ipickupanddeliverytask.model";
import { ISurveillanceTask } from "../../models/isurveillancetask.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  surveillanceTasks: ISurveillanceTask[] = [];
  pickUpAndDeliveryTasks: IPickupAndDeliveryTask[] = [];
  newSurveillanceTask: ISurveillanceTask = {
    surveillanceTaskId: '',
    contactNumber: '',
    building: '',
    floors: '',
    active: false
  };
  newPickUpAndDeliveryTask: IPickupAndDeliveryTask = {
    pickupAndDeliveryTaskId: '',
    contactNumber: '',
    pickUpRoom: '',
    deliveryRoom: '',
    pickUpContact: '',
    deliveryContact: '',
    confirmationCode: '',
    description: '',
    active: false
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedOption: string = '';

  constructor(private surveillanceTaskService: SurveillanceTaskService, private pickUpAndDeliveryTaskService: PickUpAndDeliveryTaskService) {}

  ngOnInit(): void {
    this.surveillanceTaskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.surveillanceTasks = tasks;
      },
      (error) => {
        console.error('Failed to fetch surveillance tasks:', error);
      }
    );

    this.pickUpAndDeliveryTaskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.pickUpAndDeliveryTasks = tasks;
      },
      (error) => {
        console.error('Failed to fetch pickup and delivery tasks:', error);
      }
    );
  }

  createSurveillanceTask(): void {
    this.surveillanceTaskService.createTask(this.newSurveillanceTask).subscribe(
      (task) => {
        console.log(task);
        this.surveillanceTasks.push(task);
        this.newSurveillanceTask = {
          surveillanceTaskId: '',
          contactNumber: '',
          building: '',
          floors: '',
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

  createPickUpAndDeliveryTask(): void {
    this.pickUpAndDeliveryTaskService.createTask(this.newPickUpAndDeliveryTask).subscribe(
      (task) => {
        console.log(task);
        this.pickUpAndDeliveryTasks.push(task);

        this.newPickUpAndDeliveryTask = {
          pickupAndDeliveryTaskId: '',
          contactNumber: '',
          pickUpRoom: '',
          deliveryRoom: '',
          pickUpContact: '',
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

}
