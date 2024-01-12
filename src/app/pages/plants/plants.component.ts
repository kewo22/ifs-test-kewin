import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { HeaderTemplateComponent } from '../../components/header-template/header-template.component';
import { PlantCardComponent } from '../../components/plant-card/plant-card.component';

import { PlantService } from '../../core/services/plant.service';

import { PageType } from '../../core/enums/page-type.enum';

import { Plant } from '../../core/interfaces/plant.interface';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [HeaderTemplateComponent, PlantCardComponent, RouterModule],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.scss'
})
export class PlantsComponent {
  @Input()
  pageType?: PageType;

  plants: Plant[] = []
  offset: number = 0
  canTake: Boolean = true;
  isMoreAvailable: boolean = true;
  isLoading: boolean = false

  private unsubscribe$ = new Subject<void>();

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.loadPlants()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlants(): void {
    this.isLoading = true
    this.plantService.getPlants(this.offset)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        {
          next: plants => {
            console.log("🚀 ~ PlantsComponent ~ ngOnInit ~ plants:", plants)
            if (plants.next === null) this.isMoreAvailable = false
            this.plants = [...this.plants, ...plants.results]
          },
          error: err => {
            console.log(err)
            this.plants = []
          },
          complete: () => {
            this.isLoading = false
          }
        }
      );
  }

  onLoadMoreClick(): void {
    this.offset = this.offset + 10
    this.loadPlants()
  }
}
