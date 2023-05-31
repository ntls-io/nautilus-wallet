import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ProfileCardHorizontalComponent } from './profile-card-horizontal.component';

export default ionicStoryMeta<ProfileCardHorizontalComponent>({
  title: 'Components/ProfileCardHorizontalComponent',
  component: ProfileCardHorizontalComponent,
});

const Template: Story<ProfileCardHorizontalComponent> = (
  args: ProfileCardHorizontalComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  isVerified: true,
  owner_name: 'Nautilus Wallet',
  phone_number: '+27 (12) 456-7890',
};
