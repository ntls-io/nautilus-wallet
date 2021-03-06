import { Injectable } from '@angular/core';
import { panic } from 'src/app/utils/errors/panic';
import { NautilusAssetServicesService } from './nautilus-asset-services.service';

@Injectable({ providedIn: 'root' })
export class OnfidoService {
  constructor(private nautilusAssetServices: NautilusAssetServicesService) {}

  async start(
    first_name: string,
    last_name: string
  ): Promise<OnfidoKycStarted> {
    const response = await this.nautilusAssetServices.post<StartKyc>(
      'kyc/start',
      { first_name, last_name }
    );
    return checkedOnfidoKycStarted(response);
  }

  async createCheck(
    applicant_id: string,
    report_names: Array<string>
  ): Promise<Check> {
    return await this.nautilusAssetServices.post<CreateCheck, Check>(
      'kyc/checks/create',
      {
        applicant_id,
        report_names,
      }
    );
  }

  async retrieveCheck(check_id: string): Promise<Check> {
    return await this.nautilusAssetServices.post<RetrieveCheck, Check>(
      'kyc/checks/retrieve',
      { check_id }
    );
  }
}

const checkedOnfidoKycStarted = (response: any): OnfidoKycStarted => {
  const { applicant_id, sdk_token } = response;
  if (typeof applicant_id === 'string' && typeof sdk_token == 'string') {
    return { applicant_id, sdk_token };
  } else {
    throw panic('OnfidoService.start: unexpected response:', response);
  }
};

type StartKyc = {
  first_name: string;
  last_name: string;
};

export type OnfidoKycStarted = {
  applicant_id: string;
  sdk_token: string;
};

type CreateCheck = {
  applicant_id: string;
  report_names: Array<string>;
};

type RetrieveCheck = {
  check_id: string;
};

export type Check = {
  id?: string;
  created_at?: string;
  href?: string;
  status?: string;
  result?: string;
  download_uri?: string;
  form_uri?: string;
  redirect_uri?: string;
  results_uri?: string;
  report_names?: Array<string>;
  applicant_id?: string;
  privacy_notices_read_consent_given?: boolean;
  tags?: Array<string>;
  applicant_provides_data?: boolean;
  suppress_form_emails?: boolean;
  asynchronous?: boolean;
  webhook_ids?: Array<string>;
  report_ids?: Array<string>;
  document_ids?: Array<string>;
  consider?: Array<string>;
  sub_result?: string;
};
