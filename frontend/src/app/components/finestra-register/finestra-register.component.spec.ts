import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinestraRegisterComponent } from './finestra-register.component';

describe('FinestraRegisterComponent', () => {
  let component: FinestraRegisterComponent;
  let fixture: ComponentFixture<FinestraRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinestraRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinestraRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
