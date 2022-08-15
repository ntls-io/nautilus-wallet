import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { InputMaskModule } from '@ngneat/input-mask';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PayPage } from './pay.page';

describe('PayPage', () => {
  let component: PayPage;
  let fixture: ComponentFixture<PayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PayPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule,
        InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
