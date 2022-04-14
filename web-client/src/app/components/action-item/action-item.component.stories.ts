import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ActionItemComponent } from './action-item.component';

export default ionicStoryMeta<ActionItemComponent>(
  {
    title: 'Components/ActionItemComponent',
    component: ActionItemComponent,
  },
  {
    imports: [FontAwesomeModule],
  }
);

const Template: Story<ActionItemComponent> = (args: ActionItemComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  icon: faWallet,
  title: 'My Wallet',
};
