import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignUpQuestionsComponent } from './sign-up-questions.component';

describe('SignUpQuestionsComponent', () => {
  let component: SignUpQuestionsComponent;
  let fixture: ComponentFixture<SignUpQuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpQuestionsComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
