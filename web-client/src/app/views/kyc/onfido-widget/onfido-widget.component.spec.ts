import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OnfidoWidgetComponent } from './onfido-widget.component';

// Not a real token: just an empty JWT to let the widget initialise.
const PLACEHOLDER_JWT =
  'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo';

describe('OnfidoWidgetComponent', () => {
  let component: OnfidoWidgetComponent;
  let fixture: ComponentFixture<OnfidoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnfidoWidgetComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OnfidoWidgetComponent);
    component = fixture.componentInstance;
    component.token = PLACEHOLDER_JWT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
