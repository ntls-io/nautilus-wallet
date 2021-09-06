import { Meta, Story } from '@storybook/angular';
import { ManualAddressPage } from './manual-address.page';

export default {
  title: 'Views/LockscreenPage',
  component: ManualAddressPage,
} as Meta;

const Template: Story<ManualAddressPage> = (args: ManualAddressPage) => ({
  props: args,
});

export const Default = Template.bind({});
