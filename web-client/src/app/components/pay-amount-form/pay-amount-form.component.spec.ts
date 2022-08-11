import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { defined } from 'src/app/utils/errors/panic';
import { AngularValidationErrors } from 'src/app/utils/validation.errors';
import { NumericValidationError, parseNumber } from 'src/app/utils/validators';
import { componentDebugEvent, eventsEmitted } from 'src/tests/test.helpers';
import { PayAmountFormComponent } from './pay-amount-form.component';
import { PayAmountFormComponentModule } from './pay-amount-form.module';

describe('PayAmountFormComponent', () => {
  let component: PayAmountFormComponent;
  let fixture: ComponentFixture<PayAmountFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PayAmountFormComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PayAmountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const getForm = (): FormGroup => defined(component.paymentForm);

  describe('form submission', () => {
    const submitForm = (): void =>
      componentDebugEvent(fixture, 'form', 'submit');

    it('rejects empty', () => {
      getForm().setValue({ amount: '' });
      expect(eventsEmitted(component.amountSubmitted, submitForm)).toEqual([]);
    });

    it('rejects invalid', async () => {
      getForm().setValue({ amount: 'x' });
      expect(eventsEmitted(component.amountSubmitted, submitForm)).toEqual([]);
    });

    it('submits valid', async () => {
      for (const amount of ['1234', '123.456', ' 123.456 ']) {
        getForm().setValue({ amount });
        expect(eventsEmitted(component.amountSubmitted, submitForm)).toEqual([
          defined(parseNumber(amount)),
        ]);
      }
    });
  });

  describe('form validation', () => {
    type PossibleValidationErrors = Partial<
      AngularValidationErrors & NumericValidationError
    >;

    const cases: Array<[string, PossibleValidationErrors | null]> = [
      ['', { required: true, numeric: true }],
      ['    ', { numeric: true }],
      ['abcdef', { numeric: true }],
    ];

    for (const [amount, expectedErrors] of cases) {
      it(`${JSON.stringify(amount)} validates to ${JSON.stringify(
        expectedErrors
      )}`, () => {
        const form = getForm();
        form.setValue({ amount });
        expect(form.valid).toBe(expectedErrors === null);
        expect(form.errors).toBe(null);
        expect(form.controls.amount.errors).toEqual(expectedErrors);
      });
    }
  });
});
