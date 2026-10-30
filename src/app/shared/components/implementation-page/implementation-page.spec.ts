import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationPage } from './implementation-page';

describe('ImplementationPage', () => {
  let component: ImplementationPage;
  let fixture: ComponentFixture<ImplementationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImplementationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ImplementationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
