import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRicettaComponent } from './card-ricetta.component';

describe('CardRicettaComponent', () => {
  let component: CardRicettaComponent;
  let fixture: ComponentFixture<CardRicettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRicettaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRicettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
