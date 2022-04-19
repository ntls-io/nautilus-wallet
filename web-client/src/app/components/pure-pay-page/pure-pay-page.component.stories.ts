import { Story } from '@storybook/angular';
import { PurePayPageComponentModule } from 'src/app/components/pure-pay-page/pure-pay-page.module';
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
        'wallet',
        'receiverAddress',
        'paymentSubmitted',
        'algorandAccountData',
      ],
      outputs: ['paymentSubmitted'],
    },
  }
);

const Template: Story<PurePayPageComponent> = (args: PurePayPageComponent) => ({
  props: args,
});

const BaseArgs: Partial<PurePayPageComponent> = {
  wallet: {
    wallet_id: 'wallet id',
    owner_name: 'Wallet Owner',
    algorand_address_base32:
      'GCIMBKDKNABEI3JZIECTLKJLRN7MQ2KQ4HK36Q6TTI5ZXBBW2ZCFGIBNYY',
  },
  algorandAccountData: {
    address: 'GCIMBKDKNABEI3JZIECTLKJLRN7MQ2KQ4HK36Q6TTI5ZXBBW2ZCFGIBNYY',
    amount: 1234,
    assets: [],
  },
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
  algorandAccountData: undefined,
};
