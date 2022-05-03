import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PaymentOption } from 'src/app/components/pay/pay.component';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountAsa } from 'src/app/utils/assets/assets.algo.asa';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { PurePayPageComponent } from './pure-pay-page.component';

describe('PurePayPageComponent', () => {
  let component: PurePayPageComponent;
  let fixture: ComponentFixture<PurePayPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PurePayPageComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PurePayPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('paymentOptions', () => {
    const mockAssetId = 5;
    const provideOptions = (): PaymentOption[] => {
      const senderName = 'Wallet Owner';
      const balanceAlgo = assetAmountAlgo(1234);

      const balanceAsa = assetAmountAsa(5678, {
        assetId: mockAssetId,
        assetSymbol: 'dRand',
        decimals: 2,
      });
      const balanceXrp = assetAmountXrp(1234);
      const receiverAddress =
        'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I';
      const receiverAddressXrpl = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';

      component.senderName = senderName;
      component.algorandBalances = [balanceAlgo, balanceAsa];
      component.receiverAddress = receiverAddress;
      return [
        { senderName, senderBalance: balanceAlgo, receiverAddress },
        { senderName, senderBalance: balanceAsa, receiverAddress },
      ];
    };

    it('starts undefined', () => {
      expect(component.paymentOptions).toBeUndefined([]);
    });

    it('recalculates on change', () => {
      const expectedPaymentOptions = provideOptions();
      component.ngOnChanges(null as any);
      expect(component.paymentOptions).toEqual(expectedPaymentOptions);
    });

    it('includes transaction soft-limit without Onfido check', () => {
      const [optionAlgo, optionAsa] = provideOptions();
      // Set a limit for mockAssetId.
      component.assetConfigs = {
        Algorand: {
          ASA: { [mockAssetId]: { transactionLimitWithoutOnfidoCheck: 1000 } },
        },
      };
      component.ngOnChanges(null as any);
      expect(component.paymentOptions).toEqual([
        optionAlgo,
        { ...optionAsa, transactionLimit: 1000 },
      ]);
    });

    it('omits transaction soft-limit with Onfido check', () => {
      const expectedPaymentOptions = provideOptions();
      // Set a limit for mockAssetId.
      component.assetConfigs = {
        Algorand: {
          ASA: { [mockAssetId]: { transactionLimitWithoutOnfidoCheck: 1000 } },
        },
      };
      component.flagOnfidoCheckIsClear = true;
      component.ngOnChanges(null as any);
      expect(component.paymentOptions).toEqual(expectedPaymentOptions);
    });
  });
});
