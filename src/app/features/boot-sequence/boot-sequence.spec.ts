import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootSequence } from './boot-sequence';

describe('BootSequence', () => {
  let component: BootSequence;
  let fixture: ComponentFixture<BootSequence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootSequence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootSequence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
