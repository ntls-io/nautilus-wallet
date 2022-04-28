import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { PayFromToComponent } from 'src/app/components/pay-from-to/pay-from-to.component';
import { PayFromToAlgoArgs } from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { convertToMicroAlgos } from 'src/app/services/algosdk.utils';
import {
  ionicStoryMeta,
  provideActivatedRouteQueryParams,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { PayPageModule } from './pay.module';
import { PayPage } from './pay.page';

type Args = typeof PayFromToAlgoArgs;

export default ionicStoryMeta<Args>(
  {
    title: 'Views/PayPage',
    component: PayPage,
    subcomponents: { PayFromToComponent },
  },
  {
    imports: [HttpClientTestingModule, PayPageModule],
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
          xrpl_account: {
            key_type: 'secp256k1',
            public_key_hex: 'public key',
            address_base58: 'address',
          },
        },
        algorandAccountData: {
          address: 'address',
          amount: convertToMicroAlgos(balance.amount),
        },
      }),
    ],
  },
  props: {
    autofocus: false, // For Chromatic snapshots
  },
});

export const Default = Template.bind({});
Default.args = { ...PayFromToAlgoArgs };
