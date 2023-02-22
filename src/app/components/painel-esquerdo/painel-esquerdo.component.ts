import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Playlist } from 'src/app/models/Playlist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss'],
})
export class PainelEsquerdoComponent implements OnInit {
  menuSelecionado = 'Home';

  playlists: Playlist[] = [];

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.obterPlaylists();
  }

  botaoClick(menu: string) {
    this.menuSelecionado = menu;
    this.router.navigateByUrl(`/${menu.toLowerCase()}`);
  }

  irParaPlaylist(playlistId: string) {
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`);
  }

  obterPlaylists() {
    this.spotifyService.buscarPlaylistsUsuario().then((playlists) => {
      this.playlists = playlists;
    });
  }
}
