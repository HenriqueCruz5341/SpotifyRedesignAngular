import { Artista } from './../../models/Artista';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss'],
})
export class TopArtistaComponent implements OnInit {
  topArtista: Artista | null = null;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);

    if (artistas.length > 0) this.topArtista = artistas[0];
  }
}
