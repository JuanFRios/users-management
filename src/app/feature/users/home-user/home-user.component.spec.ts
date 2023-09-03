import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeUserComponent } from './home-user.component';

describe('HomeUserComponent', () => {
  let component: HomeUserComponent;
  let fixture: ComponentFixture<HomeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeUserComponent],
    });
    fixture = TestBed.createComponent(HomeUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    // Simulate ngOnInit call
    fixture.detectChanges();

    // Add your specific initialization checks if needed
    // For example, you can check if certain elements or properties are initialized correctly.
  });
});
