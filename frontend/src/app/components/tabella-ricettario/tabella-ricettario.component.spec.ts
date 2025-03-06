import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaRicettarioComponent } from './tabella-ricettario.component';

describe('TabellaRicettarioComponent', () => {
  let component: TabellaRicettarioComponent;
  let fixture: ComponentFixture<TabellaRicettarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaRicettarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellaRicettarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
