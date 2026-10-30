import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterimplementationPage } from './registerimplementation-page';

describe('RegisterimplementationPage', () => {
  let component: RegisterimplementationPage;
  let fixture: ComponentFixture<RegisterimplementationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterimplementationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterimplementationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
