import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PayFromToComponent } from './pay-from-to.component';

describe('PayFromToComponent', () => {
  let component: PayFromToComponent;
  let fixture: ComponentFixture<PayFromToComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IonicModule.forRoot(), SharedModule],
      }).compileComponents();

      fixture = TestBed.createComponent(PayFromToComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
