import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RobotTypeComponent } from './robot-type.component';
import { RobotTypeService } from '../../services/robot-type.service';
import { IRobotType } from "../../models/irobot-type.model";

describe('RobotTypeComponent', () => {
  let component: RobotTypeComponent;
  let fixture: ComponentFixture<RobotTypeComponent>;
  let robotTypeService: RobotTypeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RobotTypeComponent],
      providers: [RobotTypeService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RobotTypeComponent);
    component = fixture.componentInstance;
    robotTypeService = TestBed.inject(RobotTypeService);

    // Mock the getRobotTypes method
    spyOn(robotTypeService, 'getRobotTypes').and.returnValue(of([
      { typeId: '1', brand: 'Brand 1', model: 'Model 1', taskCategory: 'Category 1' },
      { typeId: '2', brand: 'Brand 2', model: 'Model 2', taskCategory: 'Category 2' }
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter robot types', () => {
    // Arrange
    const robotTypes: IRobotType[] = [
      { typeId: '1', brand: 'Brand 1', model: 'Model 1', taskCategory: 'Category 1' },
      { typeId: '2', brand: 'Brand 2', model: 'Model 2', taskCategory: 'Category 2' }
    ];
    component.robotTypes = robotTypes;
    component.filterText = '1';

    // Act
    component.filterRobotTypes();

    // Assert
    expect(component.filteredRobotTypes.length).toEqual(1);
    expect(component.filteredRobotTypes[0].typeId).toEqual('1');
  });

  it('should create robot type', () => {
    // Arrange
    const newRobotType: IRobotType = {
      typeId: '3',
      brand: 'Brand 3',
      model: 'Model 3',
      taskCategory: 'Category 3'
    };
    spyOn(robotTypeService, 'createRobotType').and.returnValue(of(newRobotType));

    // Act
    component.createRobotType();

    // Assert
    expect(component.robotTypes).toContain(newRobotType);
    expect(component.newRobotType).toEqual({
      typeId: '',
      brand: '',
      model: '',
      taskCategory: ''
    });
  });
});
