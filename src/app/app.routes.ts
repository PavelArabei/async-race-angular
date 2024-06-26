import { Routes } from '@angular/router';
import { RouterRoutes } from '@utils/constants/router-routes';

export const routes: Routes = [
  {
    path: RouterRoutes.GARAGE,
    loadComponent: () =>
      import('./garage/components/garage/garage.component').then(
        (component) => component.GarageComponent
      ),
    data: { animation: RouterRoutes.GARAGE },
  },
  {
    path: RouterRoutes.WINNERS,
    loadComponent: () =>
      import('./winners/components/winners/winners.component').then(
        (component) => component.WinnersComponent
      ),
    data: { animation: RouterRoutes.WINNERS },
  },
  { path: '', redirectTo: RouterRoutes.GARAGE, pathMatch: 'full' }, // redirect to `first-component`
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/page-not-found/page-not-found.component').then(
        (component) => component.PageNotFoundComponent
      ),
    data: { animation: '**' },
  },
];
