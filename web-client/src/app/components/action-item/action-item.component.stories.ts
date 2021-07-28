import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActionItemComponent } from './action-item.component';

export default {
  title: 'Components/ActionItemComponent',
  component: ActionItemComponent,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<ActionItemComponent> = (args: ActionItemComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  icon: faWallet,
  title: 'My Wallet',
};
