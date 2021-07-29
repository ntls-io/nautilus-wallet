import { Meta, Story } from '@storybook/angular';
import { ProfileCardHorizontalComponent } from './profile-card-horizontal.component';

export default {
  title: 'Components/ProfileCardHorizontalComponent',
  component: ProfileCardHorizontalComponent,
} as Meta;

const Template: Story<ProfileCardHorizontalComponent> = (
  args: ProfileCardHorizontalComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
