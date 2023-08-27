import { Component, Input } from '@angular/core';


export enum TagColor {
  Purple,
  Green,
  Aqua,
  Red,
  White
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Input() color: TagColor = TagColor.White;

  get colorCombination(): string {
    return `tag-${TagColor[this.color]}`;
  }
}
