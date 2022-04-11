import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletDisplay } from 'src/schema/entities';
import { provideSessionStore } from 'src/stories/storybook.helpers';
import { WalletPage } from './wallet.page';

export default {
  title: 'Views/WalletPage',
  component: WalletPage,
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
Default.args = { owner_name: 'Test Owner' };
