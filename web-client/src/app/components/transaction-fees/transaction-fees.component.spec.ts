import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AssetAmountPipe } from 'src/app/pipes/asset-amount.pipe';
import { AssetSymbolPipe } from 'src/app/pipes/asset-symbol.pipe';
import { TransactionFeePipe } from 'src/app/pipes/transaction-fee.pipe';
import { TransactionFeesComponent } from './transaction-fees.component';

describe('TransactionFeesComponent', () => {
  let component: TransactionFeesComponent;
  let fixture: ComponentFixture<TransactionFeesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          TransactionFeesComponent,
          AssetAmountPipe,
          AssetSymbolPipe,
          TransactionFeePipe,
        ],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(TransactionFeesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
