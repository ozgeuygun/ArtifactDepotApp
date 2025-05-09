import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// home.component.ts
cards = [
  { title: 'Arşiv', link: '/arsiv' },
  { title: 'Kullanıcı Girişi', link: '/login' },
  { title: 'Depo Bilgileri', link: '/depo' },
  { title: 'Harita', link: '/harita' },
  { title: 'Raporlar', link: '/raporlar' }
];

}
