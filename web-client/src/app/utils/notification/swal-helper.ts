import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalHelper {
  public swal = Swal.mixin({
    confirmButtonColor: 'var(--ion-color-primary)',
    customClass: {
      confirmButton: 'w-1/2 !rounded-full',
      title: 'font-nasalization',
    },
    backdrop: true,
    heightAuto: false,
    allowOutsideClick: false,
  });
}
