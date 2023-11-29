import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ConnectionComponent } from './connection.component';
import { ConnectionService } from '../../services/connection.service';
import { IConnection } from "../../models/iconnection.model";

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let connectionService: ConnectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConnectionComponent],
      providers: [ConnectionService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    connectionService = TestBed.inject(ConnectionService);

    // Mock the getConnections method
    spyOn(connectionService, 'getConnections').and.returnValue(of([
      { connectionId: '1', buildingfromId: 'building1', buildingtoId: 'building2', floorfromId: 'floor1', floortoId: 'floor2', locationX: 0, locationY: 0, locationToX: 0, locationToY: 0 },
      { connectionId: '2', buildingfromId: 'building3', buildingtoId: 'building4', floorfromId: 'floor3', floortoId: 'floor4', locationX: 0, locationY: 0, locationToX: 0, locationToY: 0 }
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter connections', () => {
    // Arrange
    const connections: IConnection[] = [
      { connectionId: '1', buildingfromId: 'building1', buildingtoId: 'building2', floorfromId: 'floor1', floortoId: 'floor2', locationX: 0, locationY: 0, locationToX: 0, locationToY: 0 },
      { connectionId: '2', buildingfromId: 'building3', buildingtoId: 'building4', floorfromId: 'floor3', floortoId: 'floor4', locationX: 0, locationY: 0, locationToX: 0, locationToY: 0 }
    ];
    component.connections = connections;
    component.filterText = '1';

    // Act
    component.filterConnections();

    // Assert
    expect(component.filteredConnections.length).toEqual(1);
    expect(component.filteredConnections[0].connectionId).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create connection', () => {
    // Arrange
    const newConnection: IConnection = {
      buildingfromId: 'building5',
      buildingtoId: 'building6',
      floorfromId: 'floor5',
      floortoId: 'floor6',
      locationX: 0,
      locationY: 0,
      locationToX: 0,
      locationToY: 0
    };
    spyOn(connectionService, 'createConnection').and.returnValue(of(newConnection));

    // Act
    component.createConnection();

    // Assert
    expect(component.connections).toContain(newConnection);
    expect(component.newConnection).toEqual({
      buildingfromId: '',
      buildingtoId: '',
      floorfromId: '',
      floortoId: '',
      locationX: 0,
      locationY: 0,
      locationToX: 0,
      locationToY: 0
    });
  });

  it('should edit connection', () => {
    // Arrange
    const connection: IConnection = {
      connectionId: '1',
      buildingfromId: 'building1',
      buildingtoId: 'building2',
      floorfromId: 'floor1',
      floortoId: 'floor2',
      locationX: 0,
      locationY: 0,
      locationToX: 0,
      locationToY: 0
    };

    // Act
    component.editConnection(connection);

    // Assert
    expect(component.selectedConnection).toEqual(connection);
  });

  it('should update connection', () => {
    // Arrange
    const connection: IConnection = {
      connectionId: '1',
      buildingfromId: 'building1',
      buildingtoId: 'building2',
      floorfromId: 'floor1',
      floortoId: 'floor2',
      locationX: 0,
      locationY: 0,
      locationToX: 0,
      locationToY: 0
    };
    spyOn(connectionService, 'updateConnection').and.returnValue(of(connection));

    // Act
    component.updateConnection(connection);

    // Assert
    expect(component.selectedConnection).toBeNull();
  });
});
