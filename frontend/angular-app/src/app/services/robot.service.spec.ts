import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotService } from './robot.service';
import { AuthService } from './auth.service';
import { IRobot } from '../models/irobot.model';
import { of } from 'rxjs';

describe('RobotService', () => {
  let robotService: RobotService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RobotService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    robotService = TestBed.inject(RobotService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(robotService).toBeTruthy();
  });

  it('should retrieve robots from the mock API via GET', () => {
    const mockRobots: IRobot[] =
      [
        {
          idRobot: "1",
          robotName: "test",
          typeId: "1",
          serialNumber: "test",
          description: "test",
          active: true,
        }
      ];

    authService.getToken.and.returnValue('fakeToken');

    robotService.getRobots().subscribe((robots) => {
      expect(robots).toEqual(mockRobots);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockRobots);
  });

  it('should send a new robot via POST to the mock API', () => {
    const mockRobot: IRobot =
    {
      idRobot: "1",
      robotName: "test",
      typeId: "1",
      serialNumber: "test",
      description: "test",
      active: true,
    };
    authService.getToken.and.returnValue('fakeToken');

    robotService.createRobot(mockRobot).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockRobot);

    req.flush(mockRobot);
  });

  it('should update an existing robot via PATCH to the mock API', () => {
    const idRobot = '123';
    const mockRobotData: Partial<IRobot> =
    {
      idRobot: "1",
      robotName: "test",
      typeId: "1",
      serialNumber: "test",
      description: "test",
      active: true,
    };
    authService.getToken.and.returnValue('fakeToken');

    robotService.patchRobot(idRobot, mockRobotData).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/robots/${idRobot}`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockRobotData);

    req.flush(mockRobotData);
  });


});
