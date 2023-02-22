import { Component } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss'],
})
export class BuscasRecentesComponent {
  buscasRecentes = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Funk Hits',
    'Pagodeira',
  ];

  campoBusca = '';

  definirBusca(busca: string) {
    this.campoBusca = busca;
  }

  buscar() {
    console.log('Buscando por: ' + this.campoBusca);
  }
}
