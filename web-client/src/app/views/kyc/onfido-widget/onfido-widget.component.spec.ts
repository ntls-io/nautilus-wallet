import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OnfidoWidgetComponent } from './onfido-widget.component';

describe('OnfidoWidgetComponent', () => {
  let component: OnfidoWidgetComponent;
  let fixture: ComponentFixture<OnfidoWidgetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OnfidoWidgetComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(OnfidoWidgetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
