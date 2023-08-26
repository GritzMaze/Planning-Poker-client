import { Component, Input } from '@angular/core';

export type TagColor = 'purple' | 'green' | 'yellow' | 'red' | 'white';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Input() color: TagColor = 'white';

  get colorCombination(): string {
    return `tag-${this.color}`;
  }
}
