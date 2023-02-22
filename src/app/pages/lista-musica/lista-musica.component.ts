import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Musica } from 'src/app/models/Musica';
import { faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss'],
})
export class ListaMusicaComponent implements OnInit, OnDestroy {
  musicas: Musica[] = [];
  musicaAtual: Musica | null = null;
  bannerImagem = '';
  bannerTexto = '';
  title = '';

  subs: Subscription[] = [];

  playIcone = faPlay;
  volumeIcone = faVolumeHigh;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  obterMusicas() {
    const sub = this.activatedRoute.paramMap.subscribe(async (params) => {
      const tipo = params.get('tipo');
      const id = params.get('id');

      if (tipo && id) await this.obterMusicasPorTipo(tipo, id);
    });

    this.subs.push(sub);
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async obterMusicasPorTipo(tipo: string, id: string) {
    if (tipo === 'playlist') {
      this.obterDadosPlaylist(id);
    } else if (tipo === 'artista') {
      this.obterDadosArtista(id);
    }
  }

  async obterDadosPlaylist(id: string) {
    const playlist = await this.spotifyService.obterPlaylist(id);
    const musicas = await this.spotifyService.obterMusicasPlaylist(id);
    this.definirDadosPagina(
      playlist.getNome(),
      playlist.getImageUrl(),
      musicas
    );
    this.title = 'Musicas Playlist: ' + playlist.getNome();
  }

  async obterDadosArtista(id: string) {
    const artista = await this.spotifyService.obterArtista(id);
    const musicas = await this.spotifyService.obterMusicasArtista(id);
    this.definirDadosPagina(artista.getNome(), artista.getImageUrl(), musicas);
    this.title = 'Musicas Artista: ' + artista.getNome();
  }

  definirDadosPagina(
    bannerTexto: string,
    bannerImagem: string,
    musicas: Musica[]
  ) {
    this.musicas = musicas;
    this.bannerImagem = bannerImagem;
    this.bannerTexto = bannerTexto;
  }

  executarMusica(musica: Musica) {
    this.spotifyService.executarMusica(musica.getUri());
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: Musica) {
    return musica
      .getArtistas()
      .map((artista) => artista.nome)
      .join(', ');
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
