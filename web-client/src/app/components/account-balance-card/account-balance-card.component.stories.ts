import { Meta, Story } from '@storybook/angular';
import { AccountBalanceCardComponent } from './account-balance-card.component';

export default {
  title: 'Components/AccountBalanceCardComponent',
  component: AccountBalanceCardComponent,
} as Meta;

const Template: Story<AccountBalanceCardComponent> = (
  args: AccountBalanceCardComponent
) => ({
  props: args,
});

export const Wallet = Template.bind({});
Wallet.args = {
  balance: 1000000,
};

export const AccountBalance = Template.bind({});
AccountBalance.args = {
  balance: 1000000,
  account: true,
};
