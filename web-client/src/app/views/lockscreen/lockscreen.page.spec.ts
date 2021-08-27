import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LockscreenPage } from './lockscreen.page';

describe('LockscreenPage', () => {
  let component: LockscreenPage;
  let fixture: ComponentFixture<LockscreenPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IonicModule.forRoot(), SharedModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LockscreenPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
