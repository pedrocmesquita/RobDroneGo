import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
    expect(component.filteredBuildings.length).toBe(1);
    expect(component.filteredBuildings[0].buildingId).toBe('1');
  });

  // Add more tests for other methods and properties
});
