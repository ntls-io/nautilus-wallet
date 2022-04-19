import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PayFromToComponent } from './pay-from-to.component';

export default ionicStoryMeta<PayFromToComponent>({
  title: 'Components/PayFromTo',
  component: PayFromToComponent,
  excludeStories: ['PayFromToDefaultArgs'],
});

// Export this separately for args reuse, to avoid undesired type widening.
//
// (When accessing this through `Default.args`, all fields become `Partial`.)
export const PayFromToDefaultArgs = {
  name: 'Test Owner',
  balance: 1234,
  receiverAddress: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};

const Template: Story<PayFromToComponent> = (args: PayFromToComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = PayFromToDefaultArgs;
