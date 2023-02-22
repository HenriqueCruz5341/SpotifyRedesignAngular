import { Artista } from './../../models/Artista';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss'],
})
export class TopArtistasComponent implements OnInit {
  artistas: Artista[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.obterTopArtistas();
  }

  async obterTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
  }
}
