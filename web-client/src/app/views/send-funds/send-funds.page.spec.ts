import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScannerPage } from '../scanner/scanner.page';
import { routes } from '../wallet/wallet-routing.module';
import { SendFundsPage } from './send-funds.page';

describe('SendFundsPage', () => {
  let router: Router;
  let component: SendFundsPage;
  let fixture: ComponentFixture<SendFundsPage>;
  let modalCtrl: ModalController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          SharedModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['send-funds']);
      fixture = TestBed.createComponent(SendFundsPage);
      component = fixture.componentInstance;
      modalCtrl = TestBed.get(ModalController);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#presentScanner should create a modal with the scanner component', async () => {
    const modalSpy = jasmine.createSpyObj('Modal', {
      present: Promise.resolve(),
      onWillDismiss: Promise.resolve('result'),
    });

    const modalCreateSpy = spyOn(modalCtrl, 'create')
      .withArgs({
        component: ScannerPage,
      })
      .and.resolveTo(modalSpy);

    await component.presentScanner();

    expect(modalCreateSpy).toHaveBeenCalled();
    expect(modalSpy.present).toHaveBeenCalled();
  });

  it('#execItemAction should call presentScanner', () => {
    const presentScannerSpy = spyOn(component, 'presentScanner');

    component.execItemAction('presentScanner');
    expect(presentScannerSpy).toHaveBeenCalled();
  });

  it('#execItemAction should not call anything if the action string does not match', () => {
    const presentScannerSpy = spyOn(component, 'presentScanner');

    component.execItemAction('');

    expect(presentScannerSpy.calls.count()).toBe(0);
  });
});
