import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScannerPage, ScanResult } from './scanner.page';

describe('ScannerPage', () => {
  let router: Router;
  let component: ScannerPage;
  let fixture: ComponentFixture<ScannerPage>;
  let modalCtrl: ModalController;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          SharedModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      await router.navigate(['scanner']);
      fixture = TestBed.createComponent(ScannerPage);
      component = fixture.componentInstance;

      modalCtrl = TestBed.get(ModalController);
      await modalCtrl.create({ component: ScannerPage });

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#scanSuccessHandler should dismiss modal with the given data', () => {
    const success: ScanResult = {
      type: 'scanSuccess',
      result: 'some data',
    };

    const dismissModalSpy = spyOn(modalCtrl, 'dismiss').and.resolveTo(true);

    component.scanSuccessHandler(success.result);

    expect(dismissModalSpy).toHaveBeenCalledOnceWith(success);
  });

  it('#dismissModal should dismiss the modal without data', () => {
    const dismissed: ScanResult = {
      type: 'dismissed',
    };

    const dismissModalSpy = spyOn(modalCtrl, 'dismiss').and.resolveTo(true);

    component.dismissModal();

    expect(dismissModalSpy).toHaveBeenCalledOnceWith(dismissed);
  });
});
