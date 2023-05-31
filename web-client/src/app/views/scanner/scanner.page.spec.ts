import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { routes } from 'src/app/app-routing.module';
import { ScannerPage, ScanResult } from './scanner.page';

describe('ScannerPage', () => {
  let router: Router;
  let component: ScannerPage;
  let fixture: ComponentFixture<ScannerPage>;
  let modalCtrl: ModalController;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        ZXingScannerModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    await router.navigate(['scanner']);
    fixture = TestBed.createComponent(ScannerPage);
    component = fixture.componentInstance;

    modalCtrl = TestBed.get(ModalController);
    await modalCtrl.create({ component: ScannerPage });

    fixture.detectChanges();
  }));

  // FIXME(2022-04-28, Pi): This test fails intermittently with "Uncaught (in promise): overlay does not exist"
  //                        Disable this until until we resolve that.
  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  // FIXME(2022-03-14, Pi): The following two tests fail on GitHub Actions, possibly due to a Chrome version difference.
  //                        Temporarily disable them until we resolve that.

  xit('#scanSuccessHandler should dismiss modal with the given data', () => {
    const success: ScanResult = {
      type: 'scanSuccess',
      result: 'some data',
    };

    const dismissModalSpy = spyOn(modalCtrl, 'dismiss').and.resolveTo(true);

    component.scanSuccessHandler(success.result);

    expect(dismissModalSpy).toHaveBeenCalledOnceWith(success);
  });

  xit('#dismissModal should dismiss the modal without data', () => {
    const dismissed: ScanResult = {
      type: 'dismissed',
    };

    const dismissModalSpy = spyOn(modalCtrl, 'dismiss').and.resolveTo(true);

    component.dismissModal();

    expect(dismissModalSpy).toHaveBeenCalledOnceWith(dismissed);
  });
});
