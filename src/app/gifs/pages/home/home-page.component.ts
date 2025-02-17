import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.intefaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor ( private GifsService: GifsService){}

  get gifs(): Gif[] {
    return this.GifsService.gifsList;
  }

}
