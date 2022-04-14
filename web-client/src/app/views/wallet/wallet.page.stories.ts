import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletDisplay } from 'src/schema/entities';
import {
  ionicStoryMeta,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { WalletPage } from './wallet.page';

export default ionicStoryMeta<WalletDisplay>(
  {
    title: 'Views/WalletPage',
    component: WalletPage,
  },
  {
    imports: [HttpClientTestingModule, SharedModule],
    controls: { shown: ['owner_name'] },
    layoutType: 'page',
  }
);

const Template: Story<WalletDisplay> = (wallet: WalletDisplay) => ({
  moduleMetadata: {
    providers: [provideSessionStore({ wallet })],
  },
});

export const Default = Template.bind({});
Default.args = { owner_name: 'Test Owner' };
