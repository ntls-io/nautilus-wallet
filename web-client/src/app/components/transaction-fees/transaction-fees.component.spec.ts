import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { TransactionFeePipe } from 'src/app/pipes/transaction-fee.pipe';
import { TransactionFeesComponent } from './transaction-fees.component';

describe('TransactionFeesComponent', () => {
  let component: TransactionFeesComponent;
  let fixture: ComponentFixture<TransactionFeesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFeesComponent, TransactionFeePipe],
      imports: [IonicModule.forRoot(), AssetPipesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
