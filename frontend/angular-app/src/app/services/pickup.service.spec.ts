import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PickUpAndDeliveryTaskService } from './pickUpAndDeliveryTask.service';
import { AuthService } from './auth.service';
import { IPickupAndDeliveryTask } from '../models/ipickupanddeliverytask.model';

describe('PickUpAndDeliveryTaskService', () => {
  let taskService: PickUpAndDeliveryTaskService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PickUpAndDeliveryTaskService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    taskService = TestBed.inject(PickUpAndDeliveryTaskService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should retrieve tasks from the mock API via GET', () => {
    const mockTasks: IPickupAndDeliveryTask[] =
      [
        {
          clientEmail: "test",
          pickupAndDeliveryTaskId: "1",
          contactNumber: "test",
          pickupRoom: "test",
          deliveryRoom: "test",
          pickupContact: "test",
          deliveryContact: "test",
          confirmationCode: "test",
          description: "test",
          active: true,
        }
      ];

    authService.getToken.and.returnValue('fakeToken');

    taskService.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne('https://localhost:5001/api/PickUpAndDeliveryTask');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockTasks);
  });

  it('should send a new task via POST to the mock API', () => {
    const mockTask: IPickupAndDeliveryTask = {
      clientEmail: "test",
      pickupAndDeliveryTaskId: "1",
      contactNumber: "test",
      pickupRoom: "test",
      deliveryRoom: "test",
      pickupContact: "test",
      deliveryContact: "test",
      confirmationCode: "test",
      description: "test",
      active: true,
    };


    authService.getToken.and.returnValue('fakeToken');

    taskService.createTask(mockTask).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://localhost:5001/api/PickUpAndDeliveryTask');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockTask);

    req.flush(mockTask);
  });

  it('should update an existing task via PUT to the mock API', () => {
    const mockTask: IPickupAndDeliveryTask = {
      clientEmail: "test",
      pickupAndDeliveryTaskId: "1",
      contactNumber: "test",
      pickupRoom: "test",
      deliveryRoom: "test",
      pickupContact: "test",
      deliveryContact: "test",
      confirmationCode: "test",
      description: "test",
      active: true,
    };

    authService.getToken.and.returnValue('fakeToken');

    taskService.updateTask(mockTask).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://localhost:5001/api/PickUpAndDeliveryTask');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockTask);

    req.flush(mockTask);
  });
});
