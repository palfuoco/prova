import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAvvisoComponent } from './banner-avviso.component';

describe('BannerAvvisoComponent', () => {
  let component: BannerAvvisoComponent;
  let fixture: ComponentFixture<BannerAvvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerAvvisoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAvvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
