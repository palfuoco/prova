import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map !: L.Map;

  ngAfterViewInit() {
    this.map = L.map('map').setView([41.8719, 12.5674], 5);

    L.tileLayer('https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.base.road&zoom={z}&x={x}&y={y}&subscription-key=9ocb8VounFENblDMeeTsCb2vwM2QnSWAWQjAo16bnWFaO9FOayCMJQQJ99BCACi5YpzlfqHoAAAgAZMP3yCd', {
      attribution: '© Azure Maps',
    }).addTo(this.map);
  }
}
