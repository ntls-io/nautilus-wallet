import { Meta, Story } from '@storybook/angular';
import { HomePage } from './home.page';

export default {
  title: 'Views/HomePage',
  component: HomePage,
} as Meta;

const Template: Story<HomePage> = (args: HomePage) => ({
  props: args,
});

export const Default = Template.bind({});
