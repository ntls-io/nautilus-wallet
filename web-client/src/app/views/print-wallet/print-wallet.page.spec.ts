import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ClipboardPlugin } from '@capacitor/clipboard';
import { IonicModule, ToastController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { SessionState, SessionStore } from 'src/app/state/session.store';
import {
  assertShowsToast,
  componentElement,
} from '../../../tests/test.helpers';
import { SharedModule } from '../../modules/shared/shared.module';
import { PrintWalletPage } from './print-wallet.page';

describe('PrintWalletPage', () => {
  let component: PrintWalletPage;
  let fixture: ComponentFixture<PrintWalletPage>;
  let sessionStore: SessionStore;
  let toastCtrl: ToastController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PrintWalletPage],
        imports: [IonicModule.forRoot(), RouterTestingModule, SharedModule],
      }).compileComponents();

      fixture = TestBed.createComponent(PrintWalletPage);
      component = fixture.componentInstance;
      sessionStore = TestBed.inject(SessionStore);
      toastCtrl = TestBed.inject(ToastController);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows empty by default', () => {
    const content = componentElement(fixture, 'ion-content');
    expect(Array.from(content.children)).toEqual([]);
  });

  const setWalletId = (walletId: string): void => {
    sessionStore.update(
      ({ wallet }: Partial<SessionState>): Partial<SessionState> => ({
        wallet: {
          wallet_id: walletId,
          owner_name: wallet?.owner_name ?? 'fake',
          algorand_address_base32: wallet?.algorand_address_base32 ?? 'fake',
          xrpl_account: {
            key_type: wallet?.xrpl_account?.key_type ?? 'secp256k1',
            public_key_hex: wallet?.xrpl_account?.public_key_hex ?? 'fake',
            address_base58: wallet?.xrpl_account?.address_base58 ?? 'fake',
          },
        },
      })
    );
    fixture.detectChanges();
  };

  it('shows walletId as QR data', () => {
    const walletId = 'placeholder walletId';
    expect(
      fixture.debugElement.query(By.directive(QRCodeComponent))
    ).toBeNull();

    setWalletId(walletId);
    const qrcode: QRCodeComponent = fixture.debugElement.query(
      By.directive(QRCodeComponent)
    ).componentInstance;
    expect(qrcode).not.toBeNull();
    expect(qrcode.qrdata).toBe(walletId);
  });

  it('copy button copies walletId and shows toast', async () => {
    const walletId = 'placeholder walletId';
    component.Clipboard = jasmine.createSpyObj<ClipboardPlugin>('Clipboard', {
      write: Promise.resolve(),
    });
    setWalletId(walletId);
    const copyButton = componentElement(fixture, '#copy-button');

    const expectedToast = {
      message: 'Address copied!',
      color: 'white',
      duration: 2000,
    };
    await assertShowsToast(toastCtrl, expectedToast, async () => {
      copyButton.click();
      await fixture.whenStable();
      expect(component.Clipboard.write).toHaveBeenCalledWith({
        // eslint-disable-next-line id-blacklist
        string: walletId,
      });
    });
  });

  it('notice shows toast', async (): Promise<void> => {
    const message = 'Test message';
    const toastOptions = {
      message,
      color: 'white',
      duration: 2000,
    };
    await assertShowsToast(toastCtrl, toastOptions, async () => {
      await component.notice(message);
    });
  });
});
