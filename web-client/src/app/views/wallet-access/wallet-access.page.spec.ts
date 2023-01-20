import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SessionService } from 'src/app/state/session.service';
import { SessionStore } from 'src/app/state/session.store';
import { withStubbedModalScanner } from 'src/tests/modal.helpers.spec';
import { stubActiveSession } from 'src/tests/state.helpers';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { WalletAccessPageModule } from './wallet-access.module';
import { WalletAccessPage } from './wallet-access.page';

describe('WalletAccessPage', () => {
  let component: WalletAccessPage;
  let fixture: ComponentFixture<WalletAccessPage>;

  let modalCtrl: ModalController;
  let swalSpy: jasmine.Spy<SwalFire>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WalletAccessPage],
      imports: [
        IonicModule.forRoot(),
        WalletAccessPageModule,
        RouterTestingModule.withRoutes(routes),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletAccessPage);
    component = fixture.componentInstance;

    modalCtrl = TestBed.inject(ModalController);
    swalSpy = spyOn(Swal, 'fire');

    fixture.detectChanges();
  }));

  // Check for any unexpected SweetAlert alerts.
  // (Tests that assert alerts must call swalSpy.calls.reset() after asserting.)
  afterEach(async () => {
    await expect(swalSpy).not.toHaveBeenCalled();
    await expect(swalSpy.calls.allArgs()).toEqual([]); // Better reporting.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validatedAddress', () => {
    type Address = string | undefined;
    const examples: [Address, Address][] = [
      // Rejects:
      [undefined, undefined],
      ['', undefined],
      ['  ', undefined],
      // Accepts:
      ['address', 'address'],
      // Trims whitespace:
      [' address ', 'address'],
    ];
    for (const [unvalidated, validated] of examples) {
      it(`validates ${JSON.stringify(unvalidated)} to ${JSON.stringify(
        validated
      )}`, () => {
        component.address = unvalidated;
        expect(component.validatedAddress).toBe(validated);
      });
    }
  });

  it('#openScanner should fire alert if camera permission request fails', async () => {
    // TODO: Implement this by wrapping swal in a service or using ngx-sweetalert2

    await withStubbedModalScanner(
      modalCtrl,
      { type: 'permissionDenied' },
      async () => {
        await component.openScanner();
      }
    );

    expect(swalSpy).toHaveBeenCalledOnceWith({
      icon: 'error',
      title: 'Permission required',
      text: "In order to scan a QR Code, you need to grant camera's permission",
    });
    swalSpy.calls.reset();
  });

  it('#openScanner should create the a modal with the scanner page if camera permission request succeeds', async () => {
    await withStubbedModalScanner(
      modalCtrl,
      { type: 'dismissed' },
      async () => {
        await component.openScanner();
      }
    );
  });

  describe('confirm', () => {
    for (const emptyAddress of ['', ' ']) {
      it(`rejects empty address: ${JSON.stringify(emptyAddress)}`, () => {
        const showPinEntryModalSpy = spyOn(component, 'showPinEntryModal');

        component.address = emptyAddress;
        component.confirmAddress();

        expect(showPinEntryModalSpy).not.toHaveBeenCalled();
        expect(swalSpy).toHaveBeenCalledOnceWith({
          icon: 'warning',
          title: 'Invalid Address',
          text: 'Please input a valid wallet address',
        });
        swalSpy.calls.reset();
      });
    }

    it('shows modal dialog', () => {
      const showPinEntryModalSpy = spyOn(component, 'showPinEntryModal');

      component.address = 'non-empty address';
      component.confirmAddress();

      expect(showPinEntryModalSpy).toHaveBeenCalledOnceWith();
    });
  });

  describe('onPinConfirmed', () => {
    let router: Router;
    let sessionService: SessionService;
    let openWalletSpy: jasmine.Spy<SessionService['openWallet']>;

    beforeEach(async () => {
      router = TestBed.inject(Router);
      await router.navigate(['wallet-access']);
      expect(router.url).toBe('/wallet-access');

      sessionService = TestBed.inject(SessionService);
      openWalletSpy = spyOn(sessionService, 'openWallet');
    });

    afterEach(() => {
      expect(openWalletSpy).not.toHaveBeenCalled();
      expect(openWalletSpy.calls.allArgs()).toEqual([]);
    });

    it('rejects invalid address', async () => {
      expect(component.validatedAddress).toBeUndefined();
      await expectAsync(component.onPinConfirmed('')).toBeRejectedWithError(
        'WalletAccessPage.onPinConfirmed: unexpected invalid address'
      );
    });

    const prepareExpected = () => {
      const address = 'some address';
      const pin = '12345';
      component.address = address;
      return { address, pin };
    };

    it('opens wallet', async () => {
      const expected = prepareExpected();
      // Satisfy OpenWalletGuard for navigation
      stubActiveSession(TestBed.inject(SessionStore));

      await component.onPinConfirmed(expected.pin);

      expect(openWalletSpy).toHaveBeenCalledOnceWith(
        expected.address,
        expected.pin
      );
      openWalletSpy.calls.reset();

      expect(router.url).toBe('/wallet');
    });

    it('shows open wallet error', async () => {
      const expected = prepareExpected();
      const expectedError = 'open walled failed';
      openWalletSpy.and.resolveTo(expectedError);

      await component.onPinConfirmed(expected.pin);

      expect(openWalletSpy).toHaveBeenCalledOnceWith(
        expected.address,
        expected.pin
      );
      openWalletSpy.calls.reset();

      expect(swalSpy).toHaveBeenCalledOnceWith({
        icon: 'error',
        title: 'Open Wallet Failed',
        text: expectedError,
      });
      swalSpy.calls.reset();
    });
  });
});

// XXX: Work around: @types/jasmine toHaveBeenCalledWith infers parameters for overloads incorrectly #42455
//      https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42455
// (This forces the right overload.)
type SwalFire = (options: SweetAlertOptions) => Promise<SweetAlertResult>;
