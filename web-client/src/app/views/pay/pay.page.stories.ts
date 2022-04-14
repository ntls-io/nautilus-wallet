import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputMaskModule } from '@ngneat/input-mask';
import { Story } from '@storybook/angular';
import { PayFromToComponent } from 'src/app/components/pay-from-to/pay-from-to.component';
import { PayFromToDefaultArgs } from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {
  AccountData,
  convertToMicroAlgos,
} from 'src/app/services/algosdk.utils';
import { defined } from 'src/app/utils/errors/panic';
import { environment } from 'src/environments/environment';
import {
  ionicStoryMeta,
  provideActivatedRouteQueryParams,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { PayPage } from './pay.page';

type Args = typeof PayFromToDefaultArgs;

export default ionicStoryMeta<Args>(
  {
    title: 'Views/PayPage',
    component: PayPage,
    subcomponents: { PayFromToComponent },
  },
  {
    imports: [
      HttpClientTestingModule,
      SharedModule,
      InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    ],
    controls: {
      shown: ['name', 'balance', 'receiverAddress'],
    },
    layoutType: 'page',
  }
);

const Template: Story<Args> = ({ name, balance, receiverAddress }) => ({
  moduleMetadata: {
    providers: [
      provideActivatedRouteQueryParams({ receiverAddress }),
      provideSessionStore({
        wallet: {
          wallet_id: 'id',
          owner_name: name,
          algorand_address_base32: 'address',
        },
        algorandAccountData: {
          address: 'address',
          amount: convertToMicroAlgos(balance),
        },
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
      amount: balance * 10 ** defined(environment.defaultAlgorandAssetDecimals),
      'asset-id': defined(environment.defaultAlgorandAssetId),
      creator: 'unused',
      'is-frozen': false,
    },
  ],
});
