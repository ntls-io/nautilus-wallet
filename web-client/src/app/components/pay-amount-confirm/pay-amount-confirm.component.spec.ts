import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { algoAmount } from 'src/app/utils/asset.display';
import { PayAmountConfirmComponent } from './pay-amount-confirm.component';

describe('PayAmountConfirmComponent', () => {
  let component: PayAmountConfirmComponent;
  let fixture: ComponentFixture<PayAmountConfirmComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PayAmountConfirmComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PayAmountConfirmComponent);
      component = fixture.componentInstance;
      component.balance = algoAmount(5);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
