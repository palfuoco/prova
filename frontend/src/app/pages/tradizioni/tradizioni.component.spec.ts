import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradizioniComponent } from './tradizioni.component';

describe('TradizioniComponent', () => {
  let component: TradizioniComponent;
  let fixture: ComponentFixture<TradizioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradizioniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradizioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
