import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LockscreenPage } from './lockscreen.page';

describe('LockscreenPage', () => {
  let component: LockscreenPage;
  let fixture: ComponentFixture<LockscreenPage>;

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

      fixture = TestBed.createComponent(LockscreenPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
