import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ScannerPage } from '../scanner/scanner.page';
import { ScannerService } from 'src/app/services/scanner.service';
import Swal from 'sweetalert2';
import { WalletAccessPage } from './wallet-access.page';

describe('WalletAccessPage', () => {
  let component: WalletAccessPage;
  let fixture: ComponentFixture<WalletAccessPage>;
  let scannerService: ScannerService;
  let modalCtrl: ModalController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WalletAccessPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(WalletAccessPage);
      component = fixture.componentInstance;
      scannerService = TestBed.get(ScannerService);
      modalCtrl = TestBed.get(ModalController);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openScanner should fire alert if camera permission request fails', async () => {
    // TODO: Implement this by wrapping swal in a service or using ngx-sweetalert2

    spyOn(scannerService, 'requestPermissions').and.resolveTo(false);
    const swalSpy = spyOn(Swal, 'fire');
    await component.openScanner();
    expect(swalSpy).toHaveBeenCalled();
  });

  it('#openScanner should create the a modal with the scanner page if camera permission request succeeds', async () => {
    const modalSpy = jasmine.createSpyObj('Modal', {
      present: Promise.resolve(),
      onWillDismiss: Promise.resolve('result'),
    });

    const modalCreateSpy = spyOn(modalCtrl, 'create')
      .withArgs({
        component: ScannerPage,
      })
      .and.resolveTo(modalSpy);

    spyOn(scannerService, 'requestPermissions').and.resolveTo(true);

    await component.openScanner();

    expect(modalCreateSpy).toHaveBeenCalled();
    expect(modalSpy.present).toHaveBeenCalled();
  });
});
