import { HttpClientTestingModule } from '@angular/common/http/testing';
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
    imports: [PureWalletPageComponentModule, HttpClientTestingModule],
    controls: {
      shown: [
        'name',
        'balances',
        'balancesIsLoading',
        'actionSendMoneyEnabled',
        'actionTopUpUrl',
        'actionVerifyProfileShown',
        'actionWithdrawUrl',
        'actionReceiveEnabled',
        'actionMyTransactionsUrl',
      ],
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
  balances: [assetAmountAlgo(1234.56), assetAmountXrp(123.456789)],
};

export const WithOptionalActions = Template.bind({});
WithOptionalActions.args = {
  ...Default.args,
  actionTopUpUrl: 'https://testnet.algoexplorer.io/dispenser',
  actionWithdrawUrl: 'https://testnet.algodex.com/',
  actionReceiveEnabled: true,
  actionMyTransactionsUrl:
    'https://testnet.algoexplorer.io/address/G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};

export const WithoutBalances = Template.bind({});
WithoutBalances.args = {
  ...Default.args,
  balances: [],
};
