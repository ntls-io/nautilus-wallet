import { Meta, Story } from '@storybook/angular';
import { LockscreenPage } from './lockscreen.page';

export default {
  title: 'Views/LockscreenPage',
  component: LockscreenPage,
} as Meta;

const Template: Story<LockscreenPage> = (args: LockscreenPage) => ({
  props: args,
});

export const Default = Template.bind({});
