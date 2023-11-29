import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathComponent } from "./path.component";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PathComponent', () => {
  let component: PathComponent;
  let fixture: ComponentFixture<PathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule], // Add the necessary imports
    })
      .compileComponents();

    fixture = TestBed.createComponent(PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests for other methods and properties
});
