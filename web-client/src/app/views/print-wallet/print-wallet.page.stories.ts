import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletDisplay } from 'src/schema/entities';
import {
  ionicStoryMeta,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { PrintWalletPage } from './print-wallet.page';

export default ionicStoryMeta<WalletDisplay>(
  {
    title: 'Views/PrintWalletPage',
    component: PrintWalletPage,
  },
  {
    imports: [SharedModule],
    controls: { shown: ['wallet_id'] },
    layoutType: 'page',
  }
);

const Template: Story<WalletDisplay> = (wallet: WalletDisplay) => ({
  moduleMetadata: {
    providers: [provideSessionStore({ wallet })],
  },
});

export const Default = Template.bind({});
Default.args = {
  wallet_id: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
