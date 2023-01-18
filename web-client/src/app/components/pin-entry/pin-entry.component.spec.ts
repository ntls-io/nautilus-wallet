import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { PinEntryComponentModule } from 'src/app/components/pin-entry/pin-entry.module';
import { defined } from 'src/app/utils/errors/panic';
import { AngularValidationErrors } from 'src/app/utils/validation.errors';
import { WalletAccessPage } from 'src/app/views/wallet-access/wallet-access.page';
import { componentDebugEvent, eventsEmitted } from 'src/tests/test.helpers';
import { PinEntryComponent } from './pin-entry.component';

describe('PinEntryComponent', () => {
  let component: PinEntryComponent;
  let fixture: ComponentFixture<PinEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PinEntryComponentModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [WalletAccessPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PinEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const getForm = (): FormGroup => defined(component.pinForm);

  describe('form submission', () => {
    const submitForm = (): void =>
      componentDebugEvent(fixture, 'form', 'submit');

    it('rejects empty', () => {
      getForm().setValue({ pin: '' });
      expect(eventsEmitted(component.pinConfirmed, submitForm)).toEqual([]);
    });

    it('rejects invalid', async () => {
      getForm().setValue({ pin: '123' });
      expect(eventsEmitted(component.pinConfirmed, submitForm)).toEqual([]);
    });

    it('submits valid', async () => {
      for (const pin of ['1234', '12345', '1234567890']) {
        getForm().setValue({ pin });
        expect(eventsEmitted(component.pinConfirmed, submitForm)).toEqual([
          pin,
        ]);
      }
    });

    it('rejects too long', async () => {
      getForm().setValue({ pin: '12345678901' });
      expect(eventsEmitted(component.pinConfirmed, submitForm)).toEqual([]);
    });
  });

  describe('form validation', () => {
    const cases: Array<[string, AngularValidationErrors | null]> = [
      ['', { required: true }],
      ['123', { minlength: { requiredLength: 4, actualLength: 3 } }],
      ['12345', null],
      ['1234567890', null],
      ['12345678901', { maxlength: { requiredLength: 10, actualLength: 11 } }],
      [
        '    ',
        { pattern: { requiredPattern: '/^\\d*$/', actualValue: '    ' } },
      ],
      [
        'abcdef',
        { pattern: { requiredPattern: '/^\\d*$/', actualValue: 'abcdef' } },
      ],
    ];

    for (const [pin, expectedErrors] of cases) {
      it(`${JSON.stringify(pin)} validates to ${JSON.stringify(
        expectedErrors
      )}`, () => {
        const form = getForm();
        form.setValue({ pin });
        expect(form.valid).toBe(expectedErrors === null);
        expect(form.errors).toBe(null);
        expect(form.controls.pin.errors).toEqual(expectedErrors);
      });
    }
  });
});
