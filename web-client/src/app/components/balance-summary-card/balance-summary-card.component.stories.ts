import { Story } from '@storybook/angular';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { BalanceSummaryCardComponent } from './balance-summary-card.component';
import { BalanceSummaryCardComponentModule } from './balance-summary-card.module';

export default ionicStoryMeta<BalanceSummaryCardComponent>(
  {
    title: 'Components/BalanceSummaryCard',
    component: BalanceSummaryCardComponent,
  },
  {
    imports: [BalanceSummaryCardComponentModule],
    controls: {
      shown: ['balances', 'isLoading'],
    },
  }
);

const Template: Story<BalanceSummaryCardComponent> = (
  args: BalanceSummaryCardComponent
) => ({
  props: args,
});

export const Empty = Template.bind({});
Empty.args = {};

export const WithBalances = Template.bind({});
WithBalances.args = {
  balances: [assetAmountAlgo(1234.56), assetAmountXrp(123.456789)],
};

export const LoadingEmpty = Template.bind({});
LoadingEmpty.args = { isLoading: true };

export const LoadingWithBalances = Template.bind({});
LoadingWithBalances.args = {
  balances: [assetAmountAlgo(1234.56), assetAmountXrp(123.456789)],
  isLoading: true,
};
