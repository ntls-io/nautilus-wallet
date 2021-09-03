import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ScannerPage, ScanResult } from '../scanner/scanner.page';
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

    const swalSpy = spyOn(Swal, 'fire');
    await component.openScanner();
    expect(swalSpy).toHaveBeenCalled();
  });

  it('#openScanner should create the a modal with the scanner page if camera permission request succeeds', async () => {
    const scanResult: ScanResult = { type: 'dismissed' };
    const modalSpy = jasmine.createSpyObj('Modal', {
      present: Promise.resolve(),
      onDidDismiss: Promise.resolve({ data: scanResult }),
    });

    const modalCreateSpy = spyOn(modalCtrl, 'create')
      .withArgs({
        component: ScannerPage,
      })
      .and.resolveTo(modalSpy);

    await component.openScanner();

    expect(modalCreateSpy).toHaveBeenCalled();
    expect(modalSpy.present).toHaveBeenCalled();
  });
});
