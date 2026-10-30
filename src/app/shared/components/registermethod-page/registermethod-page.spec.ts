import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermethodPage } from './registermethod-page';

describe('RegistermethodPage', () => {
  let component: RegistermethodPage;
  let fixture: ComponentFixture<RegistermethodPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistermethodPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistermethodPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
