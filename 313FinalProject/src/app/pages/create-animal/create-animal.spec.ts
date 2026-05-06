import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAnimalComponent } from './create-animal';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('CreateAnimalComponent', () => {
  let component: CreateAnimalComponent;
  let fixture: ComponentFixture<CreateAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnimalComponent, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
