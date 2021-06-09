import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() price: number = 0;
  @Input() title: string = "";
  @Input() body: string = "";
  @Input() imageUrl: string = "";
}
