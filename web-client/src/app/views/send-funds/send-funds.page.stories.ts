import { Meta, Story } from '@storybook/angular';
import { SendFundsPage } from './send-funds.page';

export default {
  title: 'Views/SendFundsPage',
  component: SendFundsPage,
} as Meta;

const Template: Story<SendFundsPage> = (args: SendFundsPage) => ({
  props: args,
});

export const Default = Template.bind({});
