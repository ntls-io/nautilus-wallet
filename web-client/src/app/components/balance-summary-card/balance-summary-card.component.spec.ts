import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BalanceSummaryCardComponent } from './balance-summary-card.component';

describe('BalanceSummaryCardComponent', () => {
  let component: BalanceSummaryCardComponent;
  let fixture: ComponentFixture<BalanceSummaryCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BalanceSummaryCardComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(BalanceSummaryCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
