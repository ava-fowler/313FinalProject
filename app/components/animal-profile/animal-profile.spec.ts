import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalProfile } from './animal-profile';

describe('AnimalProfile', () => {
  let component: AnimalProfile;
  let fixture: ComponentFixture<AnimalProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
