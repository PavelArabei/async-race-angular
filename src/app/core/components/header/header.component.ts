import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterRoutes } from '@utils/constants/router-routes';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly winnersLink = `${RouterRoutes.WINNERS}`;
  readonly garageLink = `${RouterRoutes.GARAGE}`;
}
