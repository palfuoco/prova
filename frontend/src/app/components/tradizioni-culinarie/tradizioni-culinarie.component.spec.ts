import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradizioniCulinarieComponent } from './tradizioni-culinarie.component';

describe('TradizioniCulinarieComponent', () => {
  let component: TradizioniCulinarieComponent;
  let fixture: ComponentFixture<TradizioniCulinarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradizioniCulinarieComponent] // Importa il componente standalone
    })
      .compileComponents();

    fixture = TestBed.createComponent(TradizioniCulinarieComponent);
    component = fixture.componentInstance;
    // Inizializza l'input tradizione con un valore di test
    component.tradizione = {
      id: 1,
      titolo: 'Test Tradizione',
      testo: 'Questo è un testo di prova per la tradizione.',
      regione: 'Test Regione',
      likes: 10,
      urlRicettaDettaglio: 'http://example.com/ricetta/1',
      img: 'test_image.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tradition title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toContain('Test Tradizione');
  });

  it('should emit likeClicked event when onLike is called', () => {
    spyOn(component.likeClicked, 'emit');
    component.onLike();
    expect(component.likeClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should return correct image path', () => {
    expect(component.getImagePath('test_image.jpg')).toBe('assets/img_ricette/test_image.jpg');
  });
});
