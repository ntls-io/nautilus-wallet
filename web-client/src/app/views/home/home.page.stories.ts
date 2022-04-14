import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { HomePage } from './home.page';

export default ionicStoryMeta<HomePage>(
  {
    title: 'Views/HomePage',
    component: HomePage,
  },
  {
    imports: [SharedModule],
    controls: { hidden: ['actionItems'] },
    layoutType: 'page',
  }
);

const Template: Story<HomePage> = (args: HomePage) => ({
  props: args,
});

export const Default = Template.bind({});
