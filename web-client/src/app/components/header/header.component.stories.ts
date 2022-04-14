import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { HeaderComponent } from './header.component';

export default ionicStoryMeta<HeaderComponent>({
  title: 'Components/HeaderComponent',
  component: HeaderComponent,
});

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
