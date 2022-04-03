import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { AccountAddressComponent } from './account-address.component';

export default {
  title: 'Components/AccountAddressComponent',
  component: AccountAddressComponent,
  decorators: [
    moduleMetadata({
      imports: [QRCodeModule],
    }),
  ],
} as Meta;

const Template: Story<AccountAddressComponent> = (
  args: AccountAddressComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  address: 'ZYSGPXKWJIBJCG2GQNNTGAU3NGEZK7WTM5MKB2CUSSEQG5TSPJZX45Z3MM',
  currency: 'Algorand',
};

export const NoCurrency = Template.bind({});
NoCurrency.args = {
  address: 'ZYSGPXKWJIBJCG2GQNNTGAU3NGEZK7WTM5MKB2CUSSEQG5TSPJZX45Z3MM',
};

export const CannotShare = Template.bind({});
CannotShare.args = {
  address: 'ZYSGPXKWJIBJCG2GQNNTGAU3NGEZK7WTM5MKB2CUSSEQG5TSPJZX45Z3MM',
  currency: 'Algorand',
  canShare: false,
};
