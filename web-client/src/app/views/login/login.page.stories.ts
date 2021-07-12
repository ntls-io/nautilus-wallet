import { Meta, Story } from '@storybook/angular';
import { LoginPage } from './login.page';

export default {
  title: 'Views/LoginPage',
  component: LoginPage,
} as Meta;

const Template: Story<LoginPage> = (args: LoginPage) => ({
  props: args,
});

export const Default = Template.bind({});
