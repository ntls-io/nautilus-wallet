import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PurePayPageComponent } from './pure-pay-page.component';

export default ionicStoryMeta<PurePayPageComponent>({
  title: 'Components/PurePayPage',
  component: PurePayPageComponent,
});

const Template: Story<PurePayPageComponent> = (args: PurePayPageComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
