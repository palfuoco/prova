import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigaRegioneComponent } from './riga-regione.component';

describe('RigaRegioneComponent', () => {
  let component: RigaRegioneComponent;
  let fixture: ComponentFixture<RigaRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigaRegioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigaRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
