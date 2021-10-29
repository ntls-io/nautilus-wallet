import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  LockscreenPage,
  LockscreenResult,
} from 'src/app/views/lockscreen/lockscreen.page';
import {
  withStubbedModal,
  withStubbedModalScanner,
} from 'src/tests/modal.helpers.spec';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { WalletAccessPageModule } from './wallet-access.module';
import { WalletAccessPage } from './wallet-access.page';

describe('WalletAccessPage', () => {
  let component: WalletAccessPage;
  let fixture: ComponentFixture<WalletAccessPage>;
  let modalCtrl: ModalController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WalletAccessPage],
        imports: [
          IonicModule.forRoot(),
          WalletAccessPageModule,
          RouterTestingModule,
          HttpClientTestingModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(WalletAccessPage);
      component = fixture.componentInstance;
      modalCtrl = TestBed.get(ModalController);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openScanner should fire alert if camera permission request fails', async () => {
    // TODO: Implement this by wrapping swal in a service or using ngx-sweetalert2

    const swalSpy: jasmine.Spy<SwalFire> = spyOn(Swal, 'fire');

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
      text: `In order to scan a QR Code, you need to grant camera's permission`,
    });
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

  describe('presentLock', () => {
    // This test checks that the LockscreenPage and its dependencies load correctly,
    // to catch things like incorrect imports.
    it('loads and dismisses', async () => {
      const promise = component.presentLock();

      // XXX(Pi): We can only call modalCtrl.dismiss() after presentLock() calls present(),
      //          but we don't have an easy way to wait for that.
      //          This hacky setTimeout works, for now.
      //          (500 ms seems to be about the right amount to wait reliably; 100 ms is too low.)
      setTimeout(async () => {
        await modalCtrl.dismiss();
      }, 500);

      const { success } = await promise;
      expect(success).toBe(false);
    });

    it('returns pin', async () => {
      await withStubbedModal<LockscreenResult>(
        modalCtrl,
        { component: LockscreenPage },
        { success: true, pin: '1234' },
        async () => {
          const { pin } = await component.presentLock();
          expect(pin).toBe('1234');
        }
      );
    });
  });
});

// XXX: Work around: @types/jasmine toHaveBeenCalledWith infers parameters for overloads incorrectly #42455
//      https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42455
// (This forces the right overload.)
type SwalFire = (options: SweetAlertOptions) => Promise<SweetAlertResult>;
