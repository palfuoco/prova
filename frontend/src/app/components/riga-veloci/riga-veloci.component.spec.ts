import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigaVelociComponent } from './riga-veloci.component';

describe('RigaVelociComponent', () => {
  let component: RigaVelociComponent;
  let fixture: ComponentFixture<RigaVelociComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigaVelociComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigaVelociComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
