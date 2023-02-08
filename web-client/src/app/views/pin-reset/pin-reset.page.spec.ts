import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { PinResetPage } from './pin-reset.page';
import { WalletAccessPage } from 'src/app/views/wallet-access/wallet-access.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('PinResetPage', () => {
  let component: PinResetPage;
  let fixture: ComponentFixture<PinResetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PinResetPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [WalletAccessPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PinResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
