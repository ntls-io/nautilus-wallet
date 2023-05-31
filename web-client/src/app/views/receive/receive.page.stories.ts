import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ReceivePage } from './receive.page';

export default ionicStoryMeta<ReceivePage>(
  {
    title: 'Views/ReceivePage',
    component: ReceivePage,
  },
  {
    imports: [SharedModule],
    controls: { hidden: ['actionItems'] },
    layoutType: 'page',
  }
);

const Template: Story<ReceivePage> = (args: ReceivePage) => ({
  props: args,
});

export const Default = Template.bind({});
