import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from 'src/environments/environment';
import { Artista, ArtistaFactory } from '../models/Artista';
import { Musica, MusicaFactory } from '../models/Musica';
import { Playlist, PlaylistFactory } from '../models/Playlist';
import { Usuario, UsuarioFactory } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private usuarioFactory: UsuarioFactory,
    private playlistFactory: PlaylistFactory,
    private artistaFactory: ArtistaFactory,
    private musicaFactory: MusicaFactory
  ) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();

      return true;
    } catch (error) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = this.usuarioFactory.criarUsuarioDeSpotifyUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUri = `redirect_uri=${SpotifyConfiguration.redirectUri}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = 'response_type=token&show_dialog=true';

    return `${authEndpoint}${clientId}${redirectUri}${scopes}${responseType}`;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistsUsuario(offset = 0, limit = 50): Promise<Playlist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(
      this.usuario?.getId(),
      {
        offset,
        limit,
      }
    );

    return playlists.items.map(
      this.playlistFactory.criarPlaylistDeSpotifyPlaylist
    );
  }

  async buscarTopArtistas(limit = 10): Promise<Artista[]> {
    const topArtistas = await this.spotifyApi.getMyTopArtists({ limit });

    return topArtistas.items.map(
      this.artistaFactory.criarArtistaDeSpotifyArtista
    );
  }

  async buscarTopMusicas(offset = 0, limit = 50): Promise<Musica[]> {
    const musicas = await this.spotifyApi.getMyTopTracks({ offset, limit });

    return musicas.items.map((m) =>
      this.musicaFactory.criarMusicaDeSpotifyMusica(m)
    );
  }

  async executarMusica(musicaUri: string) {
    await this.spotifyApi.queue(musicaUri);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<Musica | null> {
    const musicaAtual = await this.spotifyApi.getMyCurrentPlayingTrack();

    if (!musicaAtual.item) return null;

    return this.musicaFactory.criarMusicaDeSpotifyMusica(
      musicaAtual.item,
      musicaAtual.is_playing
    );
  }

  async obterPlaylist(playlistId: string): Promise<Playlist> {
    const playlist = await this.spotifyApi.getPlaylist(playlistId);
    return this.playlistFactory.criarPlaylistDeSpotifyPlaylist(playlist);
  }

  async obterMusicasPlaylist(
    playlistId: string,
    offset = 0,
    limit = 50
  ): Promise<Musica[]> {
    const musicas = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });

    return musicas.items.map((m) =>
      this.musicaFactory.criarMusicaDeSpotifyMusica(
        m.track as SpotifyApi.TrackObjectFull
      )
    );
  }

  async obterArtista(artistaId: string): Promise<Artista> {
    const artista = await this.spotifyApi.getArtist(artistaId);
    return this.artistaFactory.criarArtistaDeSpotifyArtista(artista);
  }

  async obterMusicasArtista(artistaId: string): Promise<Musica[]> {
    const musicas = await this.spotifyApi.getArtistTopTracks(artistaId, 'BR');

    return musicas.tracks.map((m) =>
      this.musicaFactory.criarMusicaDeSpotifyMusica(m)
    );
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious();
  }

  async pausarMusica() {
    await this.spotifyApi.pause();
  }

  async continuarMusica() {
    await this.spotifyApi.play();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.usuario = null;
  }
}
