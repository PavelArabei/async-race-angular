import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCarComponent } from './upgrade-car.component';

describe('UpgradeCarComponent', () => {
  let component: UpgradeCarComponent;
  let fixture: ComponentFixture<UpgradeCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeCarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
