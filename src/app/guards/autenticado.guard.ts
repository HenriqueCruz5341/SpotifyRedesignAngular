import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticadoGuard implements CanMatch {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');
    if (!token) return this.naoAutenticado();

    return new Promise((resolve) => {
      this.spotifyService.inicializarUsuario().then((usuarioAutenticado) => {
        if (usuarioAutenticado) {
          resolve(true);
        } else {
          resolve(this.naoAutenticado());
        }
      });
    });
  }

  naoAutenticado() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
