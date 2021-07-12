import { Meta, Story } from '@storybook/angular';
import { RegisterPage } from './register.page';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
} as Meta;

const Template: Story<RegisterPage> = (args: RegisterPage) => ({
  props: args,
});

export const Default = Template.bind({});
