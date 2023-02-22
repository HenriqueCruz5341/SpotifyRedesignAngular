import { Injectable } from '@angular/core';

export class Playlist {
  private id = '';
  private nome = '';
  private imageUrl = '';

  constructor(id?: string, nome?: string, imageUrl?: string) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (imageUrl) this.imageUrl = imageUrl;
  }

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistFactory {
  public criarPlaylist(
    id?: string,
    nome?: string,
    imageUrl?: string
  ): Playlist {
    return new Playlist(id, nome, imageUrl);
  }

  public criarPlaylistDeSpotifyPlaylist(
    spotifyPlaylist: SpotifyApi.PlaylistObjectSimplified
  ): Playlist {
    return new Playlist(
      spotifyPlaylist.id,
      spotifyPlaylist.name,
      spotifyPlaylist.images?.[0]?.url || ''
    );
  }
}
