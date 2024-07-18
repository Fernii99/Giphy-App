import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.intefaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  reSearchGifs( tag: string): void{
    this.gifsService.searchTag(tag);
  }

}
