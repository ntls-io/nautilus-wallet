import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Clipboard } from '@capacitor/clipboard';
import { IonicModule, ToastController } from '@ionic/angular';
import { PrintWalletPage } from './print-wallet.page';

describe('PrintWalletPage', () => {
  let component: PrintWalletPage;
  let fixture: ComponentFixture<PrintWalletPage>;
  let toastCtrl: ToastController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PrintWalletPage],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(PrintWalletPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('copies content to clipboard upon click', async () => {
    // eslint-disable-next-line id-blacklist
    const data = { string: 'fake wallet id' };
    const copyTo = spyOn(Clipboard, 'write');
    await Clipboard.write(data);
    expect(copyTo).toHaveBeenCalledWith(data);
  });

  xit('Notify when clipboard is done', async () => {
    const toast = await toastCtrl.create({
      message: `test`,
      color: 'white',
      duration: 200,
    });

    const toPresent = spyOn(toast, 'present').and.callThrough();

    expect(toPresent).toHaveBeenCalled();
  });
});
