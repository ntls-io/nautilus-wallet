import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OnfidoService {
  constructor(private http: HttpClient) {}

  async getToken(first_name: string, last_name: string) {
    const url = this.getAssetServicesUrl('kyc/start');
    const body = { first_name, last_name };
    const response = await this.http.post(url, body).toPromise();
    const { sdk_token } = response as { sdk_token: string };
    return sdk_token;
  }

  protected getAssetServicesUrl(path: string): string {
    const base = environment.nautilusAssetServices;
    if (base) {
      return new URL(path, base).toString();
    } else {
      throw new Error('environment.nautilusAssetServices not configured');
    }
  }
}
