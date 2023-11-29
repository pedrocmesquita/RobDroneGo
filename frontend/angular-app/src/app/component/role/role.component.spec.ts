import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleComponent } from "./role.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleComponent],
      imports: [HttpClientTestingModule, FormsModule], // Include FormsModule in imports
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests for other methods and properties
});
