import { Story } from '@storybook/angular';
import { PayFromToModule } from 'src/app/components/pay-from-to/pay-from-to.module';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PayFromToComponent } from './pay-from-to.component';

export default ionicStoryMeta<PayFromToComponent>(
  {
    title: 'Components/Pay/PayFromTo',
    component: PayFromToComponent,
    excludeStories: /Args$/,
  },
  {
    imports: [PayFromToModule],
  }
);

// Export this separately for args reuse, to avoid undesired type widening.
//
// (When accessing this through `Default.args`, all fields become `Partial`.)
export const PayFromToBaseArgs = {
  name: 'Test Owner',
};

const Template: Story<PayFromToComponent> = (args: PayFromToComponent) => ({
  props: args,
});

export const PayFromToAlgoArgs = {
  ...PayFromToBaseArgs,
  balance: assetAmountAlgo(1234),
  receiverAddress: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
export const WithAlgo = Template.bind({});
WithAlgo.args = { ...PayFromToAlgoArgs };

export const PayFromToXRPArgs = {
  ...PayFromToBaseArgs,
  balance: assetAmountXrp(1234),
  receiverAddress: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
};
export const WithXRP = Template.bind({});
WithXRP.args = { ...PayFromToXRPArgs };

export const WithWideBalance = Template.bind({});
WithWideBalance.args = {
  ...PayFromToAlgoArgs,
  balance: {
    ...PayFromToAlgoArgs.balance,
    amount: 1_234_567_890e9,
  },
};
