import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { RecurringPayPage } from './recurring-pay.page';

describe('RecurringPayPage', () => {
  let component: RecurringPayPage;
  let fixture: ComponentFixture<RecurringPayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringPayPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecurringPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
