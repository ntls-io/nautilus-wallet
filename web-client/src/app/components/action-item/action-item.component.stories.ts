import { Meta, Story } from '@storybook/angular';
import { ActionItemComponent } from './action-item.component';

export default {
  title: 'Components/ActionItemComponent',
  component: ActionItemComponent,
} as Meta;

const Template: Story<ActionItemComponent> = (args: ActionItemComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'wallet',
  title: 'My Wallet',
};
