import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletDisplay } from 'src/schema/entities';
import { provideSessionStore } from 'src/stories/storybook.helpers';
import { PrintWalletPage } from './print-wallet.page';

export default {
  title: 'Views/PrintWalletPage',
  component: PrintWalletPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<WalletDisplay> = (wallet: WalletDisplay) => ({
  moduleMetadata: {
    providers: [provideSessionStore({ wallet })],
  },
});

export const Default = Template.bind({});
Default.args = {
  wallet_id: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
