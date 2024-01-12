import { Component, Input } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { HeaderTemplateComponent } from '../../components/header-template/header-template.component';

import { PageType } from '../../core/enums/page-type.enum';
import { PlantService } from '../../core/services/plant.service';
import { FullPlant, Plant } from '../../core/interfaces/plant.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant',
  standalone: true,
  imports: [HeaderTemplateComponent],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.scss'
})
export class PlantComponent {
  @Input()
  pageType?: PageType;

  plant: FullPlant | null = null

  private unsubscribe$ = new Subject<void>();

  constructor(private plantService: PlantService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const plantId = this.activatedRoute.snapshot.params['id'];
    this.loadPlants(plantId)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlants(plantId: number): void {
    // this.isLoading = true
    this.plantService.getPlant(plantId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        {
          next: plant => {
            console.log("🚀 ~ PlantsComponent ~ ngOnInit ~ plant:", plant)
            this.plant = plant
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            // this.isLoading = false
          }
        }
      );
  }
}
