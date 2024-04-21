import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersPaginatorComponent } from './winners-paginator.component';

describe('WinnersPaginatorComponent', () => {
  let component: WinnersPaginatorComponent;
  let fixture: ComponentFixture<WinnersPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnersPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
