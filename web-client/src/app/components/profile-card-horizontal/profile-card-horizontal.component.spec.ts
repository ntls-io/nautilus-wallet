import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileCardHorizontalComponent } from './profile-card-horizontal.component';

describe('ProfileCardHorizontalComponent', () => {
  let component: ProfileCardHorizontalComponent;
  let fixture: ComponentFixture<ProfileCardHorizontalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCardHorizontalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
