import { ModalController } from '@ionic/angular';
import { ScannerPage, ScanResult } from 'src/app/views/scanner/scanner.page';

export type ModalScannerSpies = {
  modalCreateSpy: jasmine.Spy<ModalController['create']>;
  modalSpy: jasmine.SpyObj<HTMLIonModalElement>;
};

/** Stub {@link ModalController.create} with a `ScannerPage` modal that returns `scanResult` on dismiss.  */
export const stubModalScannerResult = (
  modalCtrl: ModalController,
  scanResult: ScanResult
): ModalScannerSpies => {
  const modalSpy = jasmine.createSpyObj<HTMLIonModalElement>('Modal', {
    present: Promise.resolve(),
    onDidDismiss: Promise.resolve({ data: scanResult }),
  });
  const modalCreateSpy = spyOn(modalCtrl, 'create')
    .withArgs({ component: ScannerPage })
    .and.resolveTo(modalSpy);
  return { modalCreateSpy, modalSpy };
};

/** Expect the `ScannerPage` modal to have been presented. */
export const expectModalScannerPresented = (spies: ModalScannerSpies) => {
  expect(spies.modalCreateSpy).toHaveBeenCalledOnceWith({
    component: ScannerPage,
  });
  expect(spies.modalSpy.present).toHaveBeenCalledOnceWith();
};
