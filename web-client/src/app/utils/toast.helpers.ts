import { ToastController, ToastOptions } from '@ionic/angular';

export const showToast = async (
  toastController: ToastController,
  message: string,
  opts?: ToastOptions
): Promise<HTMLIonToastElement> => {
  const toast = await toastController.create({
    message,
    ...opts,
  });
  await toast.present();
  return toast;
};
