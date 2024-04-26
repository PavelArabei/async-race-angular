import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { mainUrlInterceptor } from '@core/interceptors/main-url.interceptor';
import { LoadCarsEffects } from '@garage/redux/effects/load-cars.effects';
import { garageFeature } from '@garage/redux/state/garage.state';
import { carFeature } from '@garage/redux/state/update-car.state';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { LoadWinnersEffects } from '@winners/redux/effects/load-winners.effects';
import { winnersFeature } from '@winners/redux/state/winners.state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mainUrlInterceptor])),
    provideStore(),
    provideState(garageFeature),
    provideState(winnersFeature),
    provideState(carFeature),
    provideEffects(LoadCarsEffects, LoadWinnersEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
