import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.page.html',
  styleUrls: ['./lockscreen.page.scss'],
})
export class LockscreenPage implements OnInit {
  @Input() passcode: string | undefined = '1234';

  inputCombination = '';
  dots: any[] = [];
  isIncorrect = false;

  constructor(private modalCtrl: ModalController) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.match(/[0-9]/i)) {
      this.add(parseInt(event.key, 10));
    } else if (event.key === 'Backspace') {
      this.delete();
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.passcode) {
      [...this.passcode].forEach(() => {
        this.dots.push({
          active: false,
        });
      });

      this.showKeyboard();
    }
  }

  async showKeyboard() {
    if (Capacitor.isNativePlatform()) {
      await Keyboard.show();
    }
  }

  add(digit: number) {
    if (this.passcode && this.inputCombination.length < this.passcode.length) {
      this.inputCombination += '' + digit;
      this.updateDots();

      if (this.inputCombination.length === this.passcode.length) {
        this.verify();
      }
    }
  }

  delete() {
    if (this.inputCombination.length > 0) {
      this.inputCombination = this.inputCombination.slice(0, -1);
      this.updateDots();
    }
  }

  clear() {
    this.inputCombination = '';
    this.updateDots();
  }

  verify() {
    if (this.inputCombination === this.passcode) {
      console.log('CORRECT PASSCODE!');
      this.dismiss(true);
    } else {
      this.isIncorrect = true;
      setTimeout(() => {
        this.clear();
        this.isIncorrect = false;
      }, 1000);
    }
  }

  updateDots() {
    this.dots.forEach((dot, i) => {
      dot.active = i < this.inputCombination.length ? true : false;
    });
  }

  dismiss(data: boolean) {
    this.modalCtrl.dismiss({
      type: 'dismiss',
      data,
    });
  }
}
