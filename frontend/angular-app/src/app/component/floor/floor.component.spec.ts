import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FloorComponent } from './floor.component';
import { FloorService } from '../../services/floor.service';
import { IFloor } from '../../models/ifloor.model';

describe('FloorComponent', () => {
  let component: FloorComponent;
  let fixture: ComponentFixture<FloorComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FloorComponent],
      providers: [FloorService],
    }).compileComponents();

    fixture = TestBed.createComponent(FloorComponent);
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService);

    // Mock the getFloors method
    spyOn(floorService, 'getFloors').and.returnValue(
      of([
        { floorId: '1', buildingId: 'building1', floorNumber: 1, floorDescription: 'description1' },
        { floorId: '2', buildingId: 'building2', floorNumber: 2, floorDescription: 'description2' },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter floors', () => {
    // Arrange
    const floors: IFloor[] = [
      { floorId: '1', buildingId: 'building1', floorNumber: 1, floorDescription: 'description1' },
      { floorId: '2', buildingId: 'building2', floorNumber: 2, floorDescription: 'description2' },
    ];
    component.floors = floors;
    component.filterText = '1';

    // Act
    component.filterFloors();

    // Assert
    expect(component.filteredFloors.length).toEqual(1);
    expect(component.filteredFloors[0].floorId).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create floor', () => {
    // Arrange
    const newFloor: IFloor = {
      buildingId: '3',
      floorNumber: 3,
      floorDescription: 'description3',
    };
    spyOn(floorService, 'createFloor').and.returnValue(of(newFloor));

    // Act
    component.createFloor();

    // Assert
    expect(component.floors).toContain(newFloor);
    expect(component.newFloor).toEqual({
      buildingId: '',
      floorNumber: 0,
      floorDescription: '',
    });
  });

  it('should edit floor', () => {
    // Arrange
    const floor: IFloor = {
      floorId: '1',
      buildingId: 'building1',
      floorNumber: 1,
      floorDescription: 'description1',
    };

    // Act
    component.editFloor(floor);

    // Assert
    expect(component.selectedFloor).toEqual(floor);
  });

  it('should update floor', () => {
    // Arrange
    const floor: IFloor = {
      floorId: '1',
      buildingId: 'building1',
      floorNumber: 1,
      floorDescription: 'description1',
    };
    spyOn(floorService, 'updateFloor').and.returnValue(of(floor));

    // Act
    component.updateFloor(floor);

    // Assert
    expect(component.selectedFloor).toBeNull();
  });
});
