import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewBookmarkComponent } from './new-bookmark.component';

describe('NewBookmarkComponent', () => {
  let component: NewBookmarkComponent;
  let fixture: ComponentFixture<NewBookmarkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewBookmarkComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
