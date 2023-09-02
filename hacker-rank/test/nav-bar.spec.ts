import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SELECTORS } from '../shared/util/selectors';
import { NavBarComponent } from '@feature/users/nav-bar/nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Nav Bar', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavBarComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar existencias de los elementos por el ID', () => {

    const linkListUser = SELECTORS.NAV_BAR.linkListUser();
    const linkCreateUser = SELECTORS.NAV_BAR.linkCreateUser();
    const linkLogOut = SELECTORS.NAV_BAR.linkLogOut();

    fixture.detectChanges();

    expect(linkListUser?.tagName).toEqual('A');
    expect(linkCreateUser?.tagName).toEqual('A');
    expect(linkLogOut?.tagName).toEqual('A');
  });

});

