import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinestraLoginComponent } from './finestra-login.component';

describe('FinestraLoginComponent', () => {
  let component: FinestraLoginComponent;
  let fixture: ComponentFixture<FinestraLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinestraLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinestraLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
