import { Meta, Story } from '@storybook/angular';
import { AccountCardComponent } from './account-card.component';

export default {
  title: 'Components/AccountCardComponent',
  component: AccountCardComponent,
} as Meta;

const Template: Story<AccountCardComponent> = (args: AccountCardComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  account: {
    id: 1,
    walletId: '97df8g6r8fghubkbdsfgkbd7',
    currency: 'Ripple',
    balance: 1000000,
    code: 'XRP',
    hasAssets: false,
    symbol: 'XRP',
  },
  assets: [],
};

export const WithAssets = Template.bind({});
WithAssets.args = {
  account: {
    id: 1,
    walletId: '0x1j97f8d6gf9fdfg',
    currency: 'Algorand',
    balance: 1000000,
    code: 'Algo',
    hasAssets: true,
    symbol: 'ALGO',
  },
  assets: [
    { name: 'USDC', code: null, balance: '1,000,000' },
    { name: 'Micro-Apple', code: null, balance: '1,000,000' },
  ],
};
