import { Subscription } from 'rxjs';
import { PlayerService } from './../../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Musica } from 'src/app/models/Musica';
import {
  faPause,
  faStepBackward,
  faStepForward,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  musica: Musica | null = null;

  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  pauseIcone = faPause;
  playIcone = faPlay;

  subs: Subscription[] = [];

  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe((m) => {
      if (m) this.musica = m;
    });

    this.subs.push(sub);
  }

  proximaMusica() {
    this.spotifyService.proximaMusica();
  }

  voltarMusica() {
    this.spotifyService.voltarMusica();
  }

  pausarMusica() {
    this.spotifyService.pausarMusica();
  }

  continuarMusica() {
    this.spotifyService.continuarMusica();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
