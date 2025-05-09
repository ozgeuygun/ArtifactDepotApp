import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent {
  map!: L.Map;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const lat = parseFloat(params['lat']);
      const lng = parseFloat(params['lng']);
      const name = params['name'] || 'Depo';

      if (!isNaN(lat) && !isNaN(lng)) {
        this.initMap(lat, lng, name);
      }
    });
  }

  private initMap(lat: number, lng: number, name: string): void {
    this.map = L.map('map').setView([lat, lng], 13);  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
    L.marker([lat, lng]).addTo(this.map)
      .bindPopup(`<b>${name}</b>`)
      .openPopup();
  }
}