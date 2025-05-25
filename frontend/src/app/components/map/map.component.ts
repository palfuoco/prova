import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {ApiService} from '../../apiService';
import {RicetteService} from '../../service/ricette.service';

export interface Regione {
  nome: string,
  latitudine: number,
  longitudine: number,
  numeroRicette: number,
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit{
  private map !: L.Map;
  private regioni: Regione[] = [];
  private apiUrl = 'http://localhost:8080/api/regioni';

  constructor(private apiService: ApiService<Regione>, private ricetteService: RicetteService) {}

ngAfterViewInit() {
    this.map = L.map('map').setView([41.8719, 12.5674], 5);

    L.tileLayer('https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.base.road&zoom={z}&x={x}&y={y}&subscription-key=9ocb8VounFENblDMeeTsCb2vwM2QnSWAWQjAo16bnWFaO9FOayCMJQQJ99BCACi5YpzlfqHoAAAgAZMP3yCd', {
      attribution: '© Azure Maps',
    }).addTo(this.map);

    this.apiService.getAll(this.apiUrl + "/num_ricette").subscribe((data) => {
      this.regioni = data;
      this.addRegionMarkers();
    })
  }

  addRegionMarkers(): void {
    this.regioni.forEach(regione => {
      console.log(regione.nome + ": " + regione.numeroRicette);

      // Crea dinamicamente il contenuto del popup
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
      <p class="text-center"><b>${regione.nome}</b></p>
      <p>Ricette: ${regione.numeroRicette}</p>
      <a href="#" class="popup-link">Vedi le ricette di questa regione</a>
    `;

      popupContent.querySelector('.popup-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadRicettePerRegione(regione.nome);
      });

      L.circleMarker([regione.latitudine, regione.longitudine], {
        radius: Math.sqrt(regione.numeroRicette) * 3,
        color: '#ff6600',
        fillColor: '#ff6600',
        fillOpacity: 0.6,
        weight: 1
      })
        .bindPopup(popupContent)
        .addTo(this.map);
    });
  }


  loadRicettePerRegione(regione: string): void {
    this.ricetteService.showRicettaByRegione(regione);
  }

}
