import { Component, OnInit } from '@angular/core';
import {
  EntExampleQuery,
  EntExampleService,
  EntExampleStore,
} from 'src/app/stores/entExample';
import { StExampleQuery, StExampleService } from 'src/app/stores/stExample';

@Component({
  selector: 'app-akita',
  templateUrl: './akita.page.html',
  styleUrls: ['./akita.page.scss'],
})
export class AkitaPage implements OnInit {
  segment = 'store';

  constructor(
    public stExampleQuery: StExampleQuery,
    private stExampleService: StExampleService,
    public entExampleQuery: EntExampleQuery,
    private entExampleService: EntExampleService,
    private entExampleStore: EntExampleStore
  ) {}

  ngOnInit() {}

  addRandomEntities() {
    this.entExampleService.getRandom();
  }

  addEntity() {}

  removeEntity() {}

  updateEntity() {}

  clearEntity() {
    this.entExampleStore.reset();
  }
}
