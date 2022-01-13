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

  it('#requestPermissions should return false when camera permissions are denied', async () => {
    spyOn(service, 'checkPermissions').and.resolveTo('denied');

    const permission = await service.requestPermissions();
    expect(permission).toBeFalse();
  });

  it('#requestPermissions should try to get the video media device', async () => {
    spyOn(service, 'checkPermissions').and.resolveTo('prompt');

    spyOn(navigator.mediaDevices, 'getUserMedia')
      .withArgs({ video: true })
      .and.resolveTo({ ...new MediaStream(), active: true });

    const permission = await service.requestPermissions();
    expect(permission).toBeTrue();
  });

  it('#requestPersmissions should return false if getUserMedia fails', async () => {
    spyOn(service, 'checkPermissions').and.resolveTo('prompt');

    spyOn(navigator.mediaDevices, 'getUserMedia')
      .withArgs({ video: true })
      .and.rejectWith('error');

    const permission = await service.requestPermissions();
    expect(permission).toBeFalse();
  });

  // it('#checkPermissions should return camera permissions', async () => {
  //   const cameraPermission: CameraPermissionState = 'granted';
  //   const cameraSpy = spyOn(Camera, 'checkPermissions').and.resolveTo({
  //     camera: cameraPermission,
  //     photos: cameraPermission,
  //   });

  //   const permission = await service.checkPermissions();
  //   expect(permission).toBe(cameraPermission);
  //   expect(cameraSpy).toHaveBeenCalled();
  // });
});
