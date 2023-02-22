import { Injectable } from '@angular/core';

export class Usuario {
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
export class UsuarioFactory {
  public criarUsuario(id?: string, nome?: string, imageUrl?: string): Usuario {
    return new Usuario(id, nome, imageUrl);
  }

  public criarUsuarioDeSpotifyUsuario(
    spotifyUsuario: SpotifyApi.CurrentUsersProfileResponse
  ): Usuario {
    return new Usuario(
      spotifyUsuario.id,
      spotifyUsuario.display_name || '',
      spotifyUsuario.images?.[0]?.url || ''
    );
  }
}
