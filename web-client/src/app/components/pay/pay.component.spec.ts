import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { PayComponent, PaymentOption } from './pay.component';

describe('PayComponent', () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const setPaymentOptions = (paymentOptions: PaymentOption[]) => {
    (component.paymentOptions as PaymentOption[]) = paymentOptions;
    component.ngOnInit();
  };

  const xrpOption: PaymentOption = {
    senderName: 'XRP sender',
    senderBalance: assetAmountXrp(5),
    receiverAddress: 'XRP receiver',
  };

  describe('selectedOption', () => {
    it('undefined when no options', () => {
      expect(component.selectedOption).toBeUndefined();
    });
  });

  describe('shouldShowChangeButton', () => {
    it('not for no options', () => {
      expect(component.shouldShowChangeButton).toBeFalse();
    });

    it('for multiple options', () => {
      setPaymentOptions([{ ...xrpOption }]);
      expect(component.shouldShowChangeButton).toBeTrue();
    });
  });
});
