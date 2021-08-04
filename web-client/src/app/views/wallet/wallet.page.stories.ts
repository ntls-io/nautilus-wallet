import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
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

const Template: Story<WalletPage> = (args: WalletPage) => ({
  props: args,
});

export const Default = Template.bind({});
