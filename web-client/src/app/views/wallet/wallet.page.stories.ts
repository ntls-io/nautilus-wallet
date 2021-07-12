import { Meta, Story } from '@storybook/angular';
import { WalletPage } from './wallet.page';

export default {
  title: 'Views/WalletPage',
  component: WalletPage,
} as Meta;

const Template: Story<WalletPage> = (args: WalletPage) => ({
  props: args,
});

export const Default = Template.bind({});
