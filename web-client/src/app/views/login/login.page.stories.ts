import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { LoginPage } from './login.page';

export default ionicStoryMeta<LoginPage>(
  {
    title: 'Views/LoginPage',
    component: LoginPage,
  },
  {
    layoutType: 'page',
  }
);

const Template: Story<LoginPage> = (args: LoginPage) => ({
  props: args,
});

export const Default = Template.bind({});
