import { Story } from '@storybook/angular';
import { algoAmount, xrpAmount } from 'src/app/utils/asset.display';
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
      shown: ['balances'],
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
  balances: [algoAmount(1234.56), xrpAmount(123.456789)],
};
