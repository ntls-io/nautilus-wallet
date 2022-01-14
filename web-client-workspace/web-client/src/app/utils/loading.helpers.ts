import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

// Show the default loading overlay around `f()`.
export const withLoadingOverlay = async (
  loadingController: LoadingController,
  f: () => Promise<void>
): Promise<void> => {
  await withLoadingOverlayOpts(loadingController, {}, f);
};

// Show a loading overlay with `options` around `f()`.
export const withLoadingOverlayOpts = async (
  loadingController: LoadingController,
  options: LoadingOptions,
  f: () => Promise<void>
): Promise<void> => {
  const loading = await loadingController.create(options);
  await loading.present();
  try {
    await f();
  } finally {
    await loading.dismiss();
  }
};
