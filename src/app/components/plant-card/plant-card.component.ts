import { Component, Input } from '@angular/core';
import { Plant } from '../../core/interfaces/plant.interface';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss'
})
export class PlantCardComponent {

  @Input() plant: Plant | null = null

}
