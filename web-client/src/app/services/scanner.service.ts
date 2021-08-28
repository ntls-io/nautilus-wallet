import { Injectable } from '@angular/core';
import { Camera, CameraPermissionState } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor() {}

  async checkPermissions(): Promise<CameraPermissionState> {
    try {
      const { camera } = await Camera.checkPermissions();
      return camera;
    } catch (e) {
      return 'prompt';
    }
  }

  async requestPermissions(): Promise<Boolean> {
    if ((await this.checkPermissions()) !== 'denied') {
      //NOTE: https://github.com/ionic-team/capacitor/discussions/4944#discussioncomment-1205023
      try {
        //NOTE: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        const { active } = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        return active;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }
}
