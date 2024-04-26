import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { LoadInfoActions } from '@app/redux/actions/load-info.actions';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { IconRegisterService } from '@core/services/icon-register.service';
import { Store } from '@ngrx/store';
import { RouterRoutes } from '@utils/constants/router-routes';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isCorrectRoute = false;

  constructor(
    private iconRegisterService: IconRegisterService,
    private router: Router,
    private destroyRef: DestroyRef,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.iconRegisterService.registerIcons();
    this.checkCurrentRoute();
    this.loadInfoToState();
  }

  private checkCurrentRoute(): void {
    const { WINNERS, GARAGE } = RouterRoutes;
    const availableRoutes = [WINNERS, GARAGE] as string[];
    this.router.events
      .pipe(
        filter((event) => event.constructor.name === 'NavigationEnd'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isCorrectRoute = availableRoutes.includes(this.router.url.slice(1));
      });
  }

  private loadInfoToState(): void {
    this.store.dispatch(LoadInfoActions.loadInfo());
  }
}
