import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TradizioniGridComponent } from './tradizioni-grid.component';
import { ApiService } from '../../apiService';
import { of } from 'rxjs';
import { TradizioneCulinaria } from '../../model/tradizioni';

describe('TradizioniGridComponent', () => {
  let component: TradizioniGridComponent;
  let fixture: ComponentFixture<TradizioniGridComponent>;
  let mockApiService: jasmine.SpyObj<ApiService<TradizioneCulinaria>>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getAll', 'update']);

    await TestBed.configureTestingModule({
      imports: [TradizioniGridComponent, HttpClientTestingModule], // Importa il componente e il modulo di test HTTP
      providers: [{ provide: ApiService, useValue: mockApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TradizioniGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load traditions on init', () => {
    const mockTradizioni: TradizioneCulinaria[] = [
      { id: 1, titolo: 'Pizza', testo: 'Desc', regione: 'Campania', likes: 10, urlRicettaDettaglio: '', img: '' },
      { id: 2, titolo: 'Pasta', testo: 'Desc', regione: 'Lazio', likes: 5, urlRicettaDettaglio: '', img: '' }
    ];
    mockApiService.getAll.and.returnValue(of(mockTradizioni));

    fixture.detectChanges(); // Chiamerà ngOnInit

    expect(component.tradizioni.length).toBe(2);
    expect(component.tradizioni[0].titolo).toBe('Pizza');
    expect(mockApiService.getAll).toHaveBeenCalledWith('http://localhost:8080/api/tradizioni/all');
  });

  it('should handle like click and update likes count', () => {
    const initialTradizioni: TradizioneCulinaria[] = [
      { id: 1, titolo: 'Pizza', testo: 'Desc', regione: 'Campania', likes: 10, urlRicettaDettaglio: '', img: '', isLiked: false }
    ];
    mockApiService.getAll.and.returnValue(of(initialTradizioni));
    mockApiService.update.and.returnValue(of({} as TradizioneCulinaria)); // Il backend restituisce void o un oggetto vuoto

    fixture.detectChanges(); // ngOnInit popola le tradizioni

    const traditionIdToLike = 1;
    component.onLikeClicked(traditionIdToLike);

    expect(mockApiService.update).toHaveBeenCalledWith('http://localhost:8080/api/tradizioni', '1/like', jasmine.any(Object));

    // Dopo un like, il contatore dovrebbe essere incrementato e lo stato isLiked aggiornato
    const updatedTradition = component.tradizioni.find(t => t.id === traditionIdToLike);
    expect(updatedTradition?.likes).toBe(11);
    expect(updatedTradition?.isLiked).toBeTrue();
  });

  it('should handle unlike click and decrease likes count (frontend simulation)', () => {
    const initialTradizioni: TradizioneCulinaria[] = [
      { id: 1, titolo: 'Pizza', testo: 'Desc', regione: 'Campania', likes: 10, urlRicettaDettaglio: '', img: '', isLiked: true }
    ];
    component.likedTraditions.add(1); // Simula che sia già piaciuta

    mockApiService.getAll.and.returnValue(of(initialTradizioni));
    fixture.detectChanges();

    const traditionIdToUnlike = 1;
    component.onLikeClicked(traditionIdToUnlike); // Clicca per togliere il like

    // Assicurati che l'API update NON sia stata chiamata per l'unlike
    expect(mockApiService.update).not.toHaveBeenCalled();

    const updatedTradition = component.tradizioni.find(t => t.id === traditionIdToUnlike);
    expect(updatedTradition?.likes).toBe(9); // Dovrebbe decrementare
    expect(updatedTradition?.isLiked).toBeFalse(); // Dovrebbe essere false
  });

  it('should load liked traditions from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([1, 3]));
    spyOn(component as any, 'getAllTradizioni'); // Spia per impedire che chiami getAllTradizioni

    component.ngOnInit(); // Chiamata diretta per testare solo loadLikedTraditions

    expect(component.likedTraditions.has(1)).toBeTrue();
    expect(component.likedTraditions.has(3)).toBeTrue();
    expect(component.likedTraditions.has(2)).toBeFalse();
  });

  it('should save liked traditions to localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.likedTraditions.add(5);
    component.likedTraditions.add(10);
    (component as any).saveLikedTraditions();
    expect(localStorage.setItem).toHaveBeenCalledWith('likedTraditions', JSON.stringify([5, 10]));
  });
});
