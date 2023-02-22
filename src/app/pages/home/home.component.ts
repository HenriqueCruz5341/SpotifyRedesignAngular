import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Musica } from 'src/app/models/Musica';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from './../../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: Musica[] = [];
  musicaAtual: Musica | null = null;

  subs: Subscription[] = [];

  playIcone = faPlay;
  volumeIcone = faVolumeHigh;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.obterTopMusicas();
    this.obterMusicaAtual();
  }

  async obterTopMusicas() {
    this.musicas = await this.spotifyService.buscarTopMusicas();
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterArtistas(musica: Musica) {
    return musica
      .getArtistas()
      .map((artista) => artista.nome)
      .join(', ');
  }

  executarMusica(musica: Musica) {
    this.spotifyService.executarMusica(musica.getUri());
    this.playerService.definirMusicaAtual(musica);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
