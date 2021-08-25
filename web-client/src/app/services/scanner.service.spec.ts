import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
  let service: ScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
    });
    service = TestBed.inject(ScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return camera state', async () => {
    const permission = await service.checkPermissions();
    expect(permission).toBeDefined();
    expect(['prompt', 'prompt-with-rationale', 'granted', 'denied']).toContain(
      permission
    );
  });
});
