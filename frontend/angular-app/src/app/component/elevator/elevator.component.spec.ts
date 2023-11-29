import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ElevatorComponent } from './elevator.component';
import { ElevatorService } from '../../services/elevator.service';
import { IElevator } from '../../models/ielevator.model';

describe('ElevatorComponent', () => {
  let component: ElevatorComponent;
  let fixture: ComponentFixture<ElevatorComponent>;
  let elevatorService: ElevatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ElevatorComponent],
      providers: [ElevatorService],
    }).compileComponents();

    fixture = TestBed.createComponent(ElevatorComponent);
    component = fixture.componentInstance;
    elevatorService = TestBed.inject(ElevatorService);

    // Mock the getElevators method
    spyOn(elevatorService, 'getElevators').and.returnValue(
      of([
        {
          elevatorId: '1',
          floorsAttended: '',
          elevatorBrand: '',
          elevatorModel: '',
          elevatorSerNum: '',
          elevatorDesc: '',
          currentFloor: 0,
          locationX: 0,
          locationY: 0,
        },
        {
          elevatorId: '2',
          floorsAttended: '',
          elevatorBrand: '',
          elevatorModel: '',
          elevatorSerNum: '',
          elevatorDesc: '',
          currentFloor: 0,
          locationX: 0,
          locationY: 0,
        },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter elevators', () => {
    // Arrange
    const elevators: IElevator[] = [
      {
        elevatorId: '1',
        floorsAttended: '',
        elevatorBrand: '',
        elevatorModel: '',
        elevatorSerNum: '',
        elevatorDesc: '',
        currentFloor: 0,
        locationX: 0,
        locationY: 0,
      },
      {
        elevatorId: '2',
        floorsAttended: '',
        elevatorBrand: '',
        elevatorModel: '',
        elevatorSerNum: '',
        elevatorDesc: '',
        currentFloor: 0,
        locationX: 0,
        locationY: 0,
      },
    ];
    component.elevators = elevators;
    component.filterText = '1';

    // Act
    component.filterElevators();

    // Assert
    expect(component.filteredElevators.length).toEqual(1);
    expect(component.filteredElevators[0].elevatorId).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create elevator', () => {
    // Arrange
    const newElevator: IElevator = {
      elevatorId: '3',
      floorsAttended: '',
      elevatorBrand: '',
      elevatorModel: '',
      elevatorSerNum: '',
      elevatorDesc: '',
      currentFloor: 0,
      locationX: 0,
      locationY: 0,
    };
    spyOn(elevatorService, 'createElevator').and.returnValue(of(newElevator));

    // Act
    component.createElevator();

    // Assert
    expect(component.elevators).toContain(newElevator);
    expect(component.newElevator).toEqual({
      elevatorId: '',
      floorsAttended: '',
      elevatorBrand: '',
      elevatorModel: '',
      elevatorSerNum: '',
      elevatorDesc: '',
      currentFloor: 0,
      locationX: 0,
      locationY: 0,
    });
  });
});
