import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMachineComponent } from './random-machine.component';

describe('RandomMachineComponent', () => {
  let component: RandomMachineComponent;
  let fixture: ComponentFixture<RandomMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
