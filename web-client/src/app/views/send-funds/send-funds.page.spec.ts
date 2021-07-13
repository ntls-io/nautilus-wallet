import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SendFundsPage } from './send-funds.page';

describe('SendFundsPage', () => {
  let component: SendFundsPage;
  let fixture: ComponentFixture<SendFundsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SendFundsPage],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(SendFundsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
