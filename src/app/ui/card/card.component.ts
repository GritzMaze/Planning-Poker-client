import { Component, Input } from '@angular/core';
import { Card } from 'src/app/server/models/Card';
import { TagColor } from '../tag/tag.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card;

  @Input() color: string;

  get tagColor(): TagColor {
    const priority = this.card.priority;
    switch (priority) {
      case 'Low':
        return TagColor.Green;
      case 'Medium':
        return TagColor.Aqua;
      case 'High':
        return TagColor.Purple;
      case 'Critical':
        return TagColor.Red;
      default:
        return TagColor.Green;
    }
  }
}
