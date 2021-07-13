import { Meta, Story } from '@storybook/angular';
import { LandingPage } from './landing.page';

export default {
  title: 'Views/LandingPage',
  component: LandingPage,
} as Meta;

const Template: Story<LandingPage> = (args: LandingPage) => ({
  props: args,
});

export const Default = Template.bind({});
