import { Routes } from '@angular/router';

import { PlantsComponent } from './pages/plants/plants.component';
import { PlantComponent } from './pages/plant/plant.component';
import { PageType } from './core/enums/page-type.enum';

export const routes: Routes = [
    {
        path: 'plants', component: PlantsComponent, data: {
            pageType: PageType.PLANTS,
        },
    },
    {
        path: 'plant/:id', component: PlantComponent, data: {
            pageType: PageType.PLANT,
        },
    },
    // {
    //     path: '404',
    //     component: NotFoundComponent
    // },
    { path: '', redirectTo: 'plants', pathMatch: "full" },
    {
        path: '**',
        redirectTo: '404'
    },
];
