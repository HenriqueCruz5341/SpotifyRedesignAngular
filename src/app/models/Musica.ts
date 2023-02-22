import { Injectable } from '@angular/core';
import { addMilliseconds, format } from 'date-fns';

interface ArtistaMusica {
  id: string;
  nome: string;
}

interface AlbumMusica {
  id: string;
  nome: string;
  imageUrl: string;
}

export class Musica {
  private id = '';
  private uri = '';
  private titulo = '';
  private isPlaying = false;
  private artistas: ArtistaMusica[] = [];
  private album: AlbumMusica = { id: '', nome: '', imageUrl: '' };
  private tempo = 0;

  constructor(
    id?: string,
    uri?: string,
    titulo?: string,
    isPlaying?: boolean,
    artistas?: ArtistaMusica[],
    album?: AlbumMusica,
    tempo?: number
  ) {
    if (id) this.id = id;
    if (uri) this.uri = uri;
    if (titulo) this.titulo = titulo;
    if (isPlaying) this.isPlaying = isPlaying;
    if (artistas) this.artistas = artistas;
    if (album) this.album = album;
    if (tempo) this.tempo = tempo;
  }

  public getId(): string {
    return this.id;
  }

  public getUri(): string {
    return this.uri;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getArtistas(): ArtistaMusica[] {
    return this.artistas;
  }

  public getAlbum(): AlbumMusica {
    return this.album;
  }

  public getTempo(): number {
    return this.tempo;
  }

  public getTempoFormatado(): string {
    const data = addMilliseconds(new Date(0), this.tempo);
    return format(data, 'mm:ss');
  }
}

@Injectable({
  providedIn: 'root',
})
export class MusicaFactory {
  public criarMusica(
    id?: string,
    uri?: string,
    titulo?: string,
    isPlaying?: boolean,
    artistas?: ArtistaMusica[],
    album?: AlbumMusica,
    tempo?: number
  ): Musica {
    return new Musica(id, uri, titulo, isPlaying, artistas, album, tempo);
  }

  public criarMusicaDeSpotifyMusica(
    spotifyMusica: SpotifyApi.TrackObjectFull,
    isPlaying = false
  ): Musica {
    const artistas = spotifyMusica.artists.map((a) => ({
      id: a.id,
      nome: a.name,
    }));
    const album = {
      id: spotifyMusica.album.id,
      nome: spotifyMusica.album.name,
      imageUrl: spotifyMusica.album.images?.[0]?.url || '',
    };

    return new Musica(
      spotifyMusica.id,
      spotifyMusica.uri,
      spotifyMusica.name,
      isPlaying,
      artistas,
      album,
      spotifyMusica.duration_ms
    );
  }

  public criarArtistaMusicaDeSpotifyArtista(
    spotifyArtista: SpotifyApi.ArtistObjectSimplified
  ): ArtistaMusica {
    return {
      id: spotifyArtista.id,
      nome: spotifyArtista.name,
    };
  }

  public criarAlbumMusicaDeSpotifyAlbum(
    spotifyAlbum: SpotifyApi.AlbumObjectSimplified
  ): AlbumMusica {
    return {
      id: spotifyAlbum.id,
      nome: spotifyAlbum.name,
      imageUrl: spotifyAlbum.images?.[0]?.url || '',
    };
  }
}
