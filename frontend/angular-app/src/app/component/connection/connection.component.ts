import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { IConnection } from "../../models/iconnection.model";
import { BuildingService } from "../../services/building.service";
import { IBuilding } from "../../models/ibuilding.model";
import { FloorService } from "../../services/floor.service";
import { IFloor } from "../../models/ifloor.model";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  coordinatesOption = Array.from({length: 11}, (_, i) => i );
  filterOriginBuildingId: string = '';
  filterDestinationBuildingId: string = '';

  selectedOption: string = '';
  buildings: IBuilding[] = [];
  floors: IFloor[] = [];
  selectedConnection: IConnection | null = null;
  connections: IConnection[] = [];
  filteredConnections: IConnection[] = [];
  filterText: string = '';
  newConnection: IConnection = {
    buildingfromId: '',
    buildingtoId: '',
    floorfromId: '',
    floortoId: '',
    locationX: 0,
    locationY: 0,
    locationToX: 0,
    locationToY: 0,
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private connectionService: ConnectionService, private buildingService:BuildingService, private floorService:FloorService) {}

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    }
    );

    this.floorService.getFloors().subscribe((floors) => {
      this.floors = floors;
    }
    );

    this.connectionService.getConnections().subscribe(
      (connections) => {
        console.log(connections);
        this.connections = connections;
        this.filteredConnections = connections;
      },
      (error) => {
        console.error('Failed to fetch connections:', error);
      }
    );
  }

  filterConnections(): void {
    if (this.filterText) {
      // @ts-ignore
      this.filteredConnections = this.connections.filter(connection => connection.connectionId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredConnections = this.connections;
    }
  }

  filterConnectionsByBuildings() {
    this.filteredConnections = this.connections.filter(connection =>
      connection.buildingfromId === this.filterOriginBuildingId &&
      connection.buildingtoId === this.filterDestinationBuildingId
    );
  }

  selectOption(option: string) {
    if (this.selectedOption === option) {
      this.selectedOption = '';
    } else {
      this.selectedOption = option;
    }
  }

  createConnection(): void {
    this.connectionService.createConnection(this.newConnection).subscribe(
      (connection) => {
        this.connections.push(connection);
        this.newConnection = {
          buildingfromId: '',
          buildingtoId: '',
          floorfromId: '',
          floortoId: '',
          locationX: 0,
          locationY: 0,
          locationToX: 0,
          locationToY: 0,
        };
        this.successMessage = 'Connection created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to create connection:', error);
        this.errorMessage = 'Failed to create connection!';
      }
    );
  }

  editConnection(connection: IConnection): void {
    this.selectedConnection = connection;
    this.updateConnection(this.selectedConnection);
  }

  updateConnection(connection: IConnection): void {
    console.log('Updating connection:', connection);
    this.connectionService.updateConnection(connection).subscribe(
      (updatedConnection) => {
        this.selectedConnection = null;
        this.successMessage = 'Connection updated successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        setTimeout(() => {
          this.errorMessage = null;

        }, 1500); // Message will disappear after 3 seconds
        console.error('Failed to update connection:', error);
        this.errorMessage = 'Failed to update connection!';
      }
    );
  }

}
