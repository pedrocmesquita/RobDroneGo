import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import {} from 'jasmine';

import { BuildingComponent } from './building.component';
import { BuildingService } from '../../services/building.service';
import { IBuilding } from "../../models/ibuilding.model";

describe('BuildingComponent', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BuildingComponent],
      providers: [BuildingService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    buildingService = TestBed.inject(BuildingService);

    // Mock the getBuildings method
    spyOn(buildingService, 'getBuildings').and.returnValue(of([
      { buildingId: '1', buildingName: 'Building 1', buildingDescription: '', buildingNumberOfFloors: 0, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 },
      { buildingId: '2', buildingName: 'Building 2', buildingDescription: '', buildingNumberOfFloors: 0, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 }
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter buildings', () => {
    // Arrange
    const buildings: IBuilding[] = [
      { buildingId: '1', buildingName: 'Building 1', buildingDescription: '', buildingNumberOfFloors: 0, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 },
      { buildingId: '2', buildingName: 'Building 2', buildingDescription: '', buildingNumberOfFloors: 0, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 }
    ];
    component.buildings = buildings;
    component.filterText = '1';

    // Act
    component.filterBuildings();

    // Assert
    expect(component.filteredBuildings.length).toEqual(1);
    expect(component.filteredBuildings[0].buildingId).toEqual('1');
  });

  it('should filter buildings by floors', () => {
    // Arrange
    const buildings: IBuilding[] = [
      { buildingId: '1', buildingName: 'Building 1', buildingDescription: '', buildingNumberOfFloors: 1, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 },
      { buildingId: '2', buildingName: 'Building 2', buildingDescription: '', buildingNumberOfFloors: 2, dimX: 0, dimY: 0, wallHeight: 0, wallWidth: 0 }
    ];
    component.buildings = buildings;
    component.minFloors = 1;
    component.maxFloors = 1;

    // Act
    component.filterBuildingsByFloors();

    // Assert
    expect(component.filteredBuildings.length).toEqual(1);
    expect(component.filteredBuildings[0].buildingId).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create building', () => {
    // Arrange
    const newBuilding: IBuilding = {
      buildingId: '3',
      buildingName: 'Building 3',
      buildingDescription: '',
      buildingNumberOfFloors: 0,
      dimX: 0,
      dimY: 0,
      wallHeight: 0,
      wallWidth: 0
    };
    spyOn(buildingService, 'createBuilding').and.returnValue(of(newBuilding));

    // Act
    component.createBuilding();

    // Assert
    expect(component.buildings).toContain(newBuilding);
    expect(component.newBuilding).toEqual({
      buildingId: '',
      buildingName: '',
      buildingDescription: '',
      buildingNumberOfFloors: 0,
      dimX: 0,
      dimY: 0,
      wallHeight: 0,
      wallWidth: 0
    });
  });

  it('should edit building', () => {
    // Arrange
    const building: IBuilding = {
      buildingId: '1',
      buildingName: 'Building 1',
      buildingDescription: '',
      buildingNumberOfFloors: 0,
      dimX: 0,
      dimY: 0,
      wallHeight: 0,
      wallWidth: 0
    };

    // Act
    component.editBuilding(building);

    // Assert
    expect(component.selectedBuilding).toEqual(building);
  });

  it('should update building', () => {
    // Arrange
    const building: IBuilding = {
      buildingId: '1',
      buildingName: 'Building 1',
      buildingDescription: '',
      buildingNumberOfFloors: 0,
      dimX: 0,
      dimY: 0,
      wallHeight: 0,
      wallWidth: 0
    };
    spyOn(buildingService, 'updateBuilding').and.returnValue(of(building));

    // Act
    component.updateBuilding(building);

    // Assert
    expect(component.selectedBuilding).toBeNull();
  });
});
