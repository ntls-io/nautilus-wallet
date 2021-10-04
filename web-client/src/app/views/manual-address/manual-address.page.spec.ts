import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ManualAddressPage } from './manual-address.page';

describe('ManualAddressPage', () => {
  let component: ManualAddressPage;
  let fixture: ComponentFixture<ManualAddressPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          ReactiveFormsModule,
          SharedModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ManualAddressPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
