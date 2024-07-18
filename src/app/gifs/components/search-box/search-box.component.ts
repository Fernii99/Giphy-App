import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <!--
      with the function (keyup) we can tell the input to make the event function trigger everytime a keyboard button is released
      but this will trigger the function everytime a key is released, but with the (keyup.enter) will only happen when the
      Enter key is released
      -->
    <input
      type="text"
      class="form-control mb-2"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  // The ViewChild decorator is used to get a local reference from an HTML tag and save the value
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
