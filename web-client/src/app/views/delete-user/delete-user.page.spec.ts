import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from '../send-funds/send-funds-routing.module';
import { DeleteUserPage } from './delete-user.page';

describe('DeleteUserPage', () => {
  let router: Router;
  let component: DeleteUserPage;
  let fixture: ComponentFixture<DeleteUserPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeleteUserPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule.withRoutes(routes),
          HttpClientTestingModule,
        ],
      }).compileComponents();

      router = TestBed.inject(Router)
      router.navigate(['delete-user'])
      fixture = TestBed.createComponent(DeleteUserPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
