import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NautilusAssetServicesService {
  constructor(private http: HttpClient) {}

  async post<Request = object, Response = object>(
    path: string,
    body: Request
  ): Promise<Response> {
    const url = this.getAssetServicesUrl(path);
    const response = await firstValueFrom(this.http.post(url, body));
    return response as Response; // XXX: Unchecked cast
  }

  protected getAssetServicesUrl(path: string): string {
    return new URL(path, environment.nautilusAssetServices).toString();
  }
}
