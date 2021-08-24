import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  segment = 'entity';

  constructor(
    public stExampleQuery: StExampleQuery,
    private stExampleService: StExampleService,
    public entExampleQuery: EntExampleQuery,
    public entExampleService: EntExampleService,
    private entExampleStore: EntExampleStore,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  addRandomEntities() {
    this.entExampleService.getRandom();
  }

  addEntity() {}

  removeEntity(entity: string) {
    this.entExampleStore.remove(entity);
  }

  async updateEntity(entityId: string) {
    const entity = this.entExampleQuery.getEntity(entityId);

    console.log(entity);

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: entity?.name,
          placeholder: 'This will update the entity name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Update',
          handler: ({ name }) => {
            this.entExampleStore.update(entity, { name });
          },
        },
      ],
    });

    await alert.present();
  }

  clearEntity() {
    this.entExampleStore.reset();
  }
}
