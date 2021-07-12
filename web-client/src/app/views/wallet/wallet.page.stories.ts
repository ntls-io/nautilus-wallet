import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { WalletPage } from './wallet.page';

export default {
  title: 'Views/WalletPage',
  component: WalletPage,
  decorators: [
    moduleMetadata({
      imports: [QRCodeModule],
    }),
  ],
} as Meta;

const Template: Story<WalletPage> = (args: WalletPage) => ({
  props: args,
});

export const Default = Template.bind({});
