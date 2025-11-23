import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchCard } from './glitch-card';

describe('GlitchCard', () => {
  let component: GlitchCard;
  let fixture: ComponentFixture<GlitchCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlitchCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlitchCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
