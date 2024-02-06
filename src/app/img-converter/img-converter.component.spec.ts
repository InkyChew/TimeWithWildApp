import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgConverterComponent } from './img-converter.component';

describe('ImgConverterComponent', () => {
  let component: ImgConverterComponent;
  let fixture: ComponentFixture<ImgConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
