import { Story } from '@storybook/angular';
import { PurePayPageComponentModule } from 'src/app/components/pure-pay-page/pure-pay-page.module';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountAsa } from 'src/app/utils/assets/assets.algo.asa';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PurePayPageComponent } from './pure-pay-page.component';

export default ionicStoryMeta<PurePayPageComponent>(
  {
    title: 'Components/Pay/PurePayPage',
    component: PurePayPageComponent,
  },
  {
    imports: [PurePayPageComponentModule],
    controls: {
      shown: [
        'senderName',
        'receiverAddress',
        'algorandBalances',
        'paymentSubmitted',
      ],
      outputs: ['paymentSubmitted'],
    },
  }
);

const Template: Story<PurePayPageComponent> = (args: PurePayPageComponent) => ({
  props: {
    ...args,
    autofocus: false, // For Chromatic snapshots
  },
});

const BaseArgs: Partial<PurePayPageComponent> = {
  senderName: 'Wallet Owner',
  algorandBalances: [
    assetAmountAlgo(1234),
    assetAmountAsa(5678, { assetId: 5, assetSymbol: 'dRand', decimals: 2 }),
  ],
};

export const ToAlgorand = Template.bind({});
ToAlgorand.args = {
  ...BaseArgs,
  receiverAddress: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};

export const InvalidReceiver = Template.bind({});
InvalidReceiver.args = {
  ...BaseArgs,
  receiverAddress: ToAlgorand.args?.receiverAddress?.toLowerCase(),
};

export const NoAlgorandAccount = Template.bind({});
NoAlgorandAccount.args = {
  ...ToAlgorand.args,
  algorandBalances: [],
};
