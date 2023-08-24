import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() label!: string;
  @Input() value: string | number | null = null;
  @Input() customContent: boolean = false;
}
