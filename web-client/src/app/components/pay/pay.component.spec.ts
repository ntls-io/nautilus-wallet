import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { eventsEmitted } from 'src/tests/test.helpers';
import { PayComponent, Payment, PaymentOption } from './pay.component';

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

  const algoOption: PaymentOption = {
    senderName: 'Algo Sender',
    senderBalance: assetAmountAlgo(5),
    receiverAddress: 'Algo Receiver',
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

    it('defaults to sole option', () => {
      setPaymentOptions([{ ...algoOption }]);
      expect(component.selectedOption).toEqual(algoOption);
    });

    it('defaults to first of multiple options', () => {
      setPaymentOptions([{ ...algoOption }, { ...xrpOption }]);
      expect(component.selectedOption).toEqual(algoOption);
    });
  });

  describe('shouldShowChangeButton', () => {
    it('not for no options', () => {
      expect(component.shouldShowChangeButton).toBeFalse();
    });

    it('not for one option', () => {
      setPaymentOptions([{ ...algoOption }]);
      expect(component.shouldShowChangeButton).toBeFalse();
    });

    it('for multiple options', () => {
      setPaymentOptions([{ ...algoOption }, { ...xrpOption }]);
      expect(component.shouldShowChangeButton).toBeTrue();
    });
  });

  describe('paymentSubmitted', () => {
    it('fails when no selectedOption', async () => {
      expect(() =>
        component.onAmountConfirmed(assetAmountAlgo(5))
      ).toThrowError(
        'PayComponent.onAmountConfirmed: unexpected undefined: selectedOption'
      );
    });

    it('emits amount with selectedOption', () => {
      const expectedPayment: Payment = {
        amount: assetAmountAlgo(5),
        option: algoOption,
      };
      component.selectedOption = expectedPayment.option;
      expect(
        eventsEmitted(component.paymentSubmitted, () =>
          component.onAmountConfirmed(expectedPayment.amount)
        )
      ).toEqual([expectedPayment]);
    });
  });
});
