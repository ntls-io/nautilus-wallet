import { PublicKey } from './crypto';
import { Bytes } from './types';

export type AttestationReport = {
  report: SgxReport;
  enclave_public_key: PublicKey;
};

export type SgxReport = {
  body: SgxReportBody;
  key_id: Bytes;
  mac: Bytes;
};

export type SgxReportBody = {
  cpu_svn: Bytes;
  isv_ext_prod_id: Bytes;
  attributes_flags: number;
  attributes_xfrm: number;
  mr_enclave: Bytes;
  mr_signer: Bytes;
  config_id: Bytes;
  isv_prod_id: number;
  isv_svn: number;
  config_svn: number;
  isv_family_id: Bytes;
  report_data: Bytes;
};
