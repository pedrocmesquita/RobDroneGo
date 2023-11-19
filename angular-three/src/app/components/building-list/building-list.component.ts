import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import IBuildingDTO from "../../../../../src/dto/IBuildingDTO";
import {async} from "rxjs";
import {IBuilding} from "../../models/building.model";
import {BuildingService} from "../../services/building.service"

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrl: './building-list.component.css'
})
export class BuildingListComponent implements OnInit {

  buildings: IBuilding[] = [];
  buildingAux: any;

  constructor(
    private buildingService: BuildingService
  ) {
  }

  ngOnInit(): void {

    this.buildingService.getBuildings().subscribe((data: any) => {
        this.buildings = data;
      }
    )
  }
}






