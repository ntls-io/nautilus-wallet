import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { routes } from '../send-funds/send-funds-routing.module';
import { ScannerPage } from './scanner.page';

describe('ScannerPage', () => {
  let router: Router;
  let component: ScannerPage;
  let fixture: ComponentFixture<ScannerPage>;

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
      router.navigate(['scanner']);
      fixture = TestBed.createComponent(ScannerPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
