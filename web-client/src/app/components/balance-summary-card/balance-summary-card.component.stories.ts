import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { BalanceSummaryCardComponent } from './balance-summary-card.component';

export default ionicStoryMeta<BalanceSummaryCardComponent>(
  {
    title: 'Components/BalanceSummaryCard',
    component: BalanceSummaryCardComponent,
  },
  {
    imports: [HttpClientTestingModule],
    layoutType: 'page',
  }
);

const Template: Story<BalanceSummaryCardComponent> = (
  args: BalanceSummaryCardComponent
) => ({
  props: args,
});

export const Empty = Template.bind({});
Empty.args = {};

export const LoadingEmpty = Template.bind({});
LoadingEmpty.args = { isLoading: true };
