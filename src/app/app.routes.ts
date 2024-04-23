import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { GarageComponent } from '@garage/components/garage/garage.component';
import { RouterRoutes } from '@utils/constants/router-routes';
import { WinnersComponent } from '@winners/components/winners/winners.component';

export const routes: Routes = [
  { path: RouterRoutes.GARAGE, component: GarageComponent },
  { path: RouterRoutes.WINNERS, component: WinnersComponent },
  { path: '', redirectTo: RouterRoutes.GARAGE, pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },
];
