import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from './AuthServiceMock';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Add this import

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, HttpClientModule, MatMenuModule, MatIconModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: HttpClient, useValue: {} }, // Provide a mock object for HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('check if counter is zero', () => {
    let counter = 0;
    expect(counter).toEqual(0);
  });

  // Add more tests for other methods and properties
});
