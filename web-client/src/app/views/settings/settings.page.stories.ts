import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { SettingsPage } from './settings.page';

export default ionicStoryMeta<SettingsPage>(
  {
    title: 'Views/SettingsPage',
    component: SettingsPage,
  },
  {
    imports: [],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<SettingsPage> = (args: SettingsPage) => ({
  props: args,
});

export const Default = Template.bind({});
