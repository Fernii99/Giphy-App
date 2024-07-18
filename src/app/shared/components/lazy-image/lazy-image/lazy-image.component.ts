import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: 'lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = 'a';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if( !this.url) throw new Error('URL Property is not required');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
          }, 1000)
    }
 }
