import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { LockscreenPage } from './lockscreen.page';

export default ionicStoryMeta<LockscreenPage>(
  {
    title: 'Views/LockscreenPage',
    component: LockscreenPage,
  },
  {
    imports: [SharedModule],
    controls: {
      shown: ['autofocus', 'onSubmit'],
      outputs: ['onSubmit'],
    },
    layoutType: 'page',
  }
);

const Template: Story<LockscreenPage> = (args: LockscreenPage) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  // Disable autofocus by default, for consistent Chromatic snapshots
  autofocus: false,
};
