import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PayFromToDefaultArgs } from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { convertToMicroAlgos } from 'src/app/services/algosdk.utils';
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

type Args = typeof PayFromToDefaultArgs;

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
