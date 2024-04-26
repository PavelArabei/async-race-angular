import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { LoadInfoActions } from '@app/redux/actions/load-info.actions';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { IconRegisterService } from '@core/services/icon-register.service';
import { Store } from '@ngrx/store';
import { slider } from '@utils/functions/router-animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private iconRegisterService: IconRegisterService,
    private store: Store,
    private contexts: ChildrenOutletContexts
  ) {}

  public ngOnInit(): void {
    this.iconRegisterService.registerIcons();
    this.loadInfoToState();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  private loadInfoToState(): void {
    this.store.dispatch(LoadInfoActions.loadInfo());
  }
}
