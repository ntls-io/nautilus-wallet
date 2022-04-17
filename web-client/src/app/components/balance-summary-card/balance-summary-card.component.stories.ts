import { Story } from '@storybook/angular';
import { BalanceSummaryCardComponent } from 'src/app/components/balance-summary-card/balance-summary-card.component';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';

export default ionicStoryMeta<BalanceSummaryCardComponent>({
  title: 'Components/BalanceSummaryCard',
  component: BalanceSummaryCardComponent,
});

const Template: Story<BalanceSummaryCardComponent> = (
  args: BalanceSummaryCardComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
