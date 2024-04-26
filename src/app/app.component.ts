import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { IconRegisterService } from '@core/services/icon-register.service';
import { RouterRoutes } from '@utils/constants/router-routes';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isCorrectRoute = false;
  private readonly iconRegisterService = inject(IconRegisterService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.iconRegisterService.registerIcons();
    this.checkCurrentRoute();
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
}
