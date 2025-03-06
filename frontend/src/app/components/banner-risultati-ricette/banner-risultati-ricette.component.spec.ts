import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRisultatiRicetteComponent } from './banner-risultati-ricette.component';

describe('BannerRisultatiRicetteComponent', () => {
  let component: BannerRisultatiRicetteComponent;
  let fixture: ComponentFixture<BannerRisultatiRicetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerRisultatiRicetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerRisultatiRicetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
