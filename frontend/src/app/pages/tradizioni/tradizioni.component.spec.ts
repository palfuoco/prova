import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser'; // Per testare il servizio Title
import { TradizioniComponent } from './tradizioni.component';
import { HeaderComponent } from '../../components/header/header.component'; // Mock o reale
import { FooterComponent } from '../../components/footer/footer.component'; // Mock o reale
import { TradizioniGridComponent } from '../../components/tradizioni-grid/tradizioni-grid.component'; // Mock o reale

// Mock per il servizio Title
class MockTitleService {
  setTitle(title: string) {}
}

describe('TradizioniComponent', () => {
  let component: TradizioniComponent;
  let fixture: ComponentFixture<TradizioniComponent>;
  let titleService: MockTitleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TradizioniComponent, // Componente standalone
        HeaderComponent, // Fornisci HeaderComponent (può essere un mock per i test unitari)
        FooterComponent, // Fornisci FooterComponent (può essere un mock per i test unitari)
        TradizioniGridComponent // Fornisci TradizioniGridComponent (può essere un mock)
      ],
      providers: [
        { provide: Title, useClass: MockTitleService } // Fornisci il mock del TitleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TradizioniComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title) as unknown as MockTitleService; // Recupera l'istanza del mock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on creation', () => {
    spyOn(titleService, 'setTitle');
    const newComponent = new TradizioniComponent(titleService); // Crea una nuova istanza per testare il costruttore
    expect(titleService.setTitle).toHaveBeenCalledWith('Tradizioni Culinarie - Mangia Italia');
  });
});
