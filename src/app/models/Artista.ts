import { Injectable } from '@angular/core';

export class Artista {
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
export class ArtistaFactory {
  public criarArtista(id?: string, nome?: string, imageUrl?: string): Artista {
    return new Artista(id, nome, imageUrl);
  }

  public criarArtistaDeSpotifyArtista(
    spotifyArtista: SpotifyApi.ArtistObjectFull
  ): Artista {
    return new Artista(
      spotifyArtista.id,
      spotifyArtista.name,
      spotifyArtista.images?.[0]?.url || ''
    );
  }
}
