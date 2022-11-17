import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from '../../app-routing.module';
import { SearchWalletPage } from './search-wallet.page';

describe('SearchWalletPage', () => {
  let component: SearchWalletPage;
  let fixture: ComponentFixture<SearchWalletPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWalletPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
