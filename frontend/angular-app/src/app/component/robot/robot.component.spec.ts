import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RobotComponent } from './robot.component';
import { RobotService } from '../../services/robot.service';
import { IRobot } from '../../models/irobot.model';

describe('RobotComponent', () => {
  let component: RobotComponent;
  let fixture: ComponentFixture<RobotComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RobotComponent],
      providers: [RobotService],
    }).compileComponents();

    fixture = TestBed.createComponent(RobotComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);

    // Mock the getRobots method
    spyOn(robotService, 'getRobots').and.returnValue(
      of([
        { idRobot: '1', robotName: 'Robot 1', typeId: 'Type1', serialNumber: '123', description: 'Description 1', active: true },
        { idRobot: '2', robotName: 'Robot 2', typeId: 'Type2', serialNumber: '456', description: 'Description 2', active: false },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter robots', () => {
    // Arrange
    const robots: IRobot[] = [
      { idRobot: '1', robotName: 'Robot 1', typeId: 'Type1', serialNumber: '123', description: 'Description 1', active: true },
      { idRobot: '2', robotName: 'Robot 2', typeId: 'Type2', serialNumber: '456', description: 'Description 2', active: false },
    ];
    component.robots = robots;
    component.filterText = '1';

    // Act
    component.filterRobots();

    // Assert
    expect(component.filteredRobots.length).toEqual(1);
    expect(component.filteredRobots[0].idRobot).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create robot', () => {
    // Arrange
    const newRobot: IRobot = {
      idRobot: '3',
      robotName: 'Robot 3',
      typeId: 'Type3',
      serialNumber: '789',
      description: 'Description 3',
      active: true,
    };
    spyOn(robotService, 'createRobot').and.returnValue(of(newRobot));

    // Act
    component.createRobot();

    // Assert
    expect(component.robots).toContain(newRobot);
    expect(component.newRobot).toEqual({
      idRobot: '',
      robotName: '',
      typeId: '',
      serialNumber: '',
      description: '',
      active: true,
    });
  });
});
