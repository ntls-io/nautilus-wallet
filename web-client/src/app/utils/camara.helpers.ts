import { Capacitor } from '@capacitor/core';

export const deviceHasCamera = async () => {
  if (Capacitor.isNativePlatform()) {
    return Capacitor.isPluginAvailable('Camera');
  } else {
    const devices = await navigator?.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === 'videoinput');
  }
};
