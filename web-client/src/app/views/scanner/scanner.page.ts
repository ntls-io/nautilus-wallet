import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  scanSuccessHandler(event: any) {
    console.log(event);
  }

  scanErrorHandler(event: any) {
    console.log(event);
  }
}
