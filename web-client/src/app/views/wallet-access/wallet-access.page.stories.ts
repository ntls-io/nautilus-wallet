import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Meta, Story } from '@storybook/angular';
import { WalletAccessPage } from './wallet-access.page';

export default {
  title: 'Views/WalletAccessPage',
  component: WalletAccessPage,
} as Meta;

const Template: Story<WalletAccessPage> = (args: WalletAccessPage) => ({
  props: args,
  moduleMetadata: {
    providers: [BarcodeScanner],
  },
});

export const Default = Template.bind({});
