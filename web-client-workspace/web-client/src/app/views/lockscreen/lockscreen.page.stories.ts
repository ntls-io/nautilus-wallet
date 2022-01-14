import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LockscreenPage } from './lockscreen.page';

export default {
  title: 'Views/LockscreenPage',
  component: LockscreenPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<LockscreenPage> = (args: LockscreenPage) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  // Disable autofocus by default, for consistent Chromatic snapshots
  autofocus: false,
};
