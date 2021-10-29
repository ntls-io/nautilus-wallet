import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PayFromToDefaultArgs } from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AccountData } from 'src/app/services/algosdk.utils';
import { environment } from 'src/environments/environment';
import {
  provideActivatedRouteQueryParams,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { PayPage } from './pay.page';

export default {
  title: 'Views/PayPage',
  component: PayPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

type Args = {
  name: string;
  balance: number;
  receiverAddress: string;
};

const Template: Story<Args> = ({ name, balance, receiverAddress }: Args) => ({
  moduleMetadata: {
    providers: [
      provideActivatedRouteQueryParams({ receiverAddress }),
      provideSessionStore({
        name,
        algorandAccount: algorandAccountWithDefaultAssetBalance(balance),
      }),
    ],
  },
});

export const Default = Template.bind({});
Default.args = PayFromToDefaultArgs;

// Helper: Construct an Algorand account value that will display as the given value.
const algorandAccountWithDefaultAssetBalance = (
  balance: number
): AccountData => ({
  address: 'unused',
  amount: 0, // unused
  assets: [
    {
      // The displayed `balance` is decimal-adjusted: store the value as asset units.
      amount: balance * 10 ** environment.defaultAlgorandAssetDecimals,
      'asset-id': environment.defaultAlgorandAssetId,
      creator: 'unused',
      'is-frozen': false,
    },
  ],
});
