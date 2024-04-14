import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { mainUrlInterceptor } from '@core/interceptors/main-url.interceptor';
import { LoadCarsEffects } from '@garage/redux/effects/load-cars.effects';
import { garageFeature } from '@garage/redux/state/garage.state';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mainUrlInterceptor])),
    provideStore(),
    provideState(garageFeature),
    provideEffects(LoadCarsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
