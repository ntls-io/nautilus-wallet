import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KycPageModule } from 'src/app/views/kyc/kyc.module';
import {
  OnfidoFormComponent,
  OnfidoFormValue,
} from 'src/app/views/kyc/onfido-form/onfido-form.component';
import { componentDebugEvent, eventsEmitted } from 'src/tests/test.helpers';

describe('OnfidoFormComponent', () => {
  let component: OnfidoFormComponent;
  let fixture: ComponentFixture<OnfidoFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [KycPageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(OnfidoFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form submission', () => {
    it('rejects empty', () => {
      expect(eventsEmitted(component.submitted, submitForm)).toEqual([]);
    });

    it('submits valid', async () => {
      const valid: OnfidoFormValue = { firstName: 'First', lastName: 'Last' };
      component.nameForm.setValue(valid);
      expect(eventsEmitted(component.submitted, submitForm)).toEqual([valid]);
    });

    it('rejects blank', async () => {
      component.nameForm.setValue({ firstName: ' ', lastName: ' ' });
      expect(eventsEmitted(component.submitted, submitForm)).toEqual([]);
    });

    it('trims whitespace', async () => {
      const valid: OnfidoFormValue = {
        firstName: 'First  Name',
        lastName: 'Last',
      };
      component.nameForm.setValue({
        firstName: ' First  Name ',
        lastName: ' Last ',
      });
      expect(eventsEmitted(component.submitted, submitForm)).toEqual([valid]);
    });

    const submitForm = (): void => {
      componentDebugEvent(fixture, 'form', 'submit');
    };
  });

  describe('form validation', () => {
    const cases: Array<[[string, string], boolean]> = [
      // Invalid cases:
      [['', ''], false],
      [['First', ''], false],
      [['', 'Last'], false],
      [[' ', ' '], false],
      // Valid cases:
      [['First', 'Last'], true],
    ];

    for (const [[firstName, lastName], expected] of cases) {
      const value: OnfidoFormValue = { firstName, lastName };

      it(`${JSON.stringify(value)} validates to ${expected}`, () => {
        component.nameForm.setValue(value);
        expect(component.nameForm.valid).toBe(expected);
      });
    }
  });
});
