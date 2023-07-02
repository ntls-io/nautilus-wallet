import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { SchedulePayPage } from './schedule-pay.page';

describe('SchedulePayPage', () => {
  let component: SchedulePayPage;
  let fixture: ComponentFixture<SchedulePayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulePayPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
