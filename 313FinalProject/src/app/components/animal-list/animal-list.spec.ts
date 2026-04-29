import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalListComponent } from './animal-list';

describe('AnimalList', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
