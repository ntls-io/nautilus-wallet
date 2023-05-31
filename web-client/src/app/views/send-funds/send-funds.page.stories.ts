import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { SendFundsPage } from './send-funds.page';

export default ionicStoryMeta<SendFundsPage>(
  {
    title: 'Views/SendFundsPage',
    component: SendFundsPage,
  },
  {
    imports: [SharedModule],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<SendFundsPage> = (args: SendFundsPage) => ({
  props: args,
});

export const Default = Template.bind({});
