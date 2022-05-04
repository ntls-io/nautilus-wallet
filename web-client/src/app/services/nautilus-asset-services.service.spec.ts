import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NautilusAssetServicesService } from './nautilus-asset-services.service';

describe('NautilusAssetServicesService', () => {
  let service: NautilusAssetServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NautilusAssetServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
