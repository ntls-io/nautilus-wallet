import { Meta, Story } from '@storybook/angular';
import { KycPage } from './kyc.page';

export default {
  title: 'Views/KycPage',
  component: KycPage,
} as Meta;

const Template: Story<KycPage> = (args: KycPage) => ({
  props: args,
});

export const Default = Template.bind({});
