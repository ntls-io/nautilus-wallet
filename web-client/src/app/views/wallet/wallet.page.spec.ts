import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { verifyButtonNavigation } from '../../../tests/test.helpers';
import { routes } from '../../app-routing.module';
import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let router: Router;
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent, ActionItemComponent],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(WalletPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to send funds', async (): Promise<void> => {
    await verifyButtonNavigation(router, fixture, '/wallet/send-funds');
  });
});
