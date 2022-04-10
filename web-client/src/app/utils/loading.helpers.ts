import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

// Show the default loading overlay around `f()`.
export const withLoadingOverlay = async <T>(
  loadingController: LoadingController,
  f: () => Promise<T>
): Promise<T> => await withLoadingOverlayOpts(loadingController, {}, f);

// Show a loading overlay with `options` around `f()`.
export const withLoadingOverlayOpts = async <T>(
  loadingController: LoadingController,
  options: LoadingOptions,
  f: () => Promise<T>
): Promise<T> => {
  const loading = await loadingController.create(options);
  await loading.present();
  try {
    return await f();
  } finally {
    await loading.dismiss();
  }
};
