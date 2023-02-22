import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Musica } from '../models/Musica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  musicaAtual = new Subject<Musica>();
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    if (musica) this.definirMusicaAtual(musica);
    this.timerId = setInterval(async () => await this.obterMusicaAtual(), 3000);
  }

  definirMusicaAtual(musica: Musica) {
    this.musicaAtual.next(musica);
  }
}
