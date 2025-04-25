import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpazioRecensioneComponent } from './spazio-recensione.component';

describe('SpazioRecensioneComponent', () => {
  let component: SpazioRecensioneComponent;
  let fixture: ComponentFixture<SpazioRecensioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpazioRecensioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpazioRecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
