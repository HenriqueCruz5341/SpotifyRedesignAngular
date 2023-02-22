import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artista-item-imagem',
  templateUrl: './artista-item-imagem.component.html',
  styleUrls: ['./artista-item-imagem.component.scss'],
})
export class ArtistaItemImagemComponent {
  @Input()
  artistaNome = '';

  @Input()
  artistaImagem = '';

  @Output()
  click = new EventEmitter();

  onClick() {
    this.click.emit();
  }
}
