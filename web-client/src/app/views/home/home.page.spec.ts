import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { routes } from '../../app-routing.module';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let router: Router;
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          SharedModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router);
      router.navigate(['home']);
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
