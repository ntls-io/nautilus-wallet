import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SdkResponse } from 'onfido-sdk-ui';
import {
  Check,
  OnfidoKycStarted,
  OnfidoService,
} from 'src/app/services/onfido.service';
import { KycPage } from './kyc.page';
import { OnfidoFormValue } from './onfido-form/onfido-form.component';
import Spy = jasmine.Spy;

describe('KycPage', () => {
  let onfidoService: OnfidoService;

  let component: KycPage;
  let fixture: ComponentFixture<KycPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [KycPage],
        imports: [IonicModule.forRoot(), HttpClientTestingModule],
      }).compileComponents();

      onfidoService = TestBed.inject(OnfidoService);

      fixture = TestBed.createComponent(KycPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.viewState).toBe('step1_form');
  });

  const stubOnfidoStarted: OnfidoKycStarted = {
    applicant_id: 'stub applicant_id',
    sdk_token: 'stub sdk_token',
  };

  it('onSubmit', async () => {
    const formValue: OnfidoFormValue = { firstName: 'First', lastName: 'Last' };

    const startSpy: Spy<typeof onfidoService.start> = spyOn(
      onfidoService,
      'start'
    ).and.resolveTo(stubOnfidoStarted);

    await component.onSubmit(formValue);

    expect(startSpy).toHaveBeenCalledOnceWith(
      formValue.firstName,
      formValue.lastName
    );
    expect(component.onfidoStarted).toBe(stubOnfidoStarted);
    expect(component.token).toBe(stubOnfidoStarted.sdk_token);
    expect(component.viewState).toBe('step2_widget');
  });

  it('onSdkComplete + createCheck', async () => {
    const sdkResponse: SdkResponse = {};

    const check: Check = { id: 'placeholder id' };
    const createCheckSpy: Spy<typeof onfidoService.createCheck> = spyOn(
      onfidoService,
      'createCheck'
    ).and.resolveTo(check);

    component.onfidoStarted = stubOnfidoStarted;
    await component.onSdkComplete(sdkResponse);

    expect(createCheckSpy).toHaveBeenCalledOnceWith(
      stubOnfidoStarted.applicant_id,
      ['document', 'facial_similarity_video']
    );
    expect(component.check).toBe(check);
    expect(component.viewState).toBe('step3_result');
  });

  it('refreshCheck', async () => {
    const checkId = 'placeholder id';
    const check1: Check = { id: checkId, status: 'in_progress' };
    const check2: Check = { id: checkId, status: 'complete' };

    const retrieveCheckSpy: Spy<typeof onfidoService.retrieveCheck> = spyOn(
      onfidoService,
      'retrieveCheck'
    ).and.resolveTo(check2);

    component.check = check1;
    await component.refreshCheck();

    expect(retrieveCheckSpy).toHaveBeenCalledOnceWith(checkId);
    expect(component.check).toBe(check2);
  });
});
