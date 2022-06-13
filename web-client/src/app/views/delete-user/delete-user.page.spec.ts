import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SessionStore } from 'src/app/state/session.store';
import { stubActiveSession } from 'src/tests/state.helpers';
import { routes } from '../send-funds/send-funds-routing.module';
import { DeleteUserPage } from './delete-user.page';

describe('DeleteUserPage', () => {
  let component: DeleteUserPage;
  let fixture: ComponentFixture<DeleteUserPage>;
  let sessionStore: SessionStore;

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

      fixture = TestBed.createComponent(DeleteUserPage);
      sessionStore = TestBed.inject(SessionStore);
      stubActiveSession(sessionStore, {
        wallet: { owner_name: 'Wallet Owner' },
      });

      component = fixture.componentInstance;

      // XXX: Stub this out, for now.
      spyOn(component, 'refreshWalletData').and.resolveTo(undefined);

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
