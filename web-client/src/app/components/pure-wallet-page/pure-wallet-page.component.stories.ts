import { Story } from '@storybook/angular';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PureWalletPageComponent } from './pure-wallet-page.component';
import { PureWalletPageComponentModule } from './pure-wallet-page.module';

export default ionicStoryMeta<PureWalletPageComponent>(
  {
    title: 'Components/PureWalletPage',
    component: PureWalletPageComponent,
  },
  {
    imports: [PureWalletPageComponentModule],
    controls: {
      shown: ['name', 'balances'],
    },
  }
);

const Template: Story<PureWalletPageComponent> = (
  args: PureWalletPageComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  name: 'Wallet Owner',
};

export const WithBalances = Template.bind({});
WithBalances.args = {
  ...Default.args,
  balances: [assetAmountAlgo(1234.56), assetAmountXrp(123.456789)],
};
