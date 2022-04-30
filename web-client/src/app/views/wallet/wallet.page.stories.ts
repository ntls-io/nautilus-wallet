import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { of } from 'rxjs';
import { assetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { WalletDisplay } from 'src/schema/entities';
import {
  ionicStoryMeta,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { WalletPageModule } from './wallet.module';
import { WalletPage } from './wallet.page';

type Args = {
  name?: string;
  balances?: AssetAmount[];
  requireKycBeforeSendPayment?: boolean;
  onfidoCheckIsClear?: boolean;
};

export default ionicStoryMeta<Args>(
  {
    title: 'Views/WalletPage',
    component: WalletPage,
  },
  {
    imports: [HttpClientTestingModule, WalletPageModule],
    controls: {
      shown: [
        'name',
        'balances',
        'requireKycBeforeSendPayment',
        'onfidoCheckIsClear',
      ],
    },
    layoutType: 'page',
  }
);

const Template: Story<Args> = ({
  name,
  balances,
  onfidoCheckIsClear,
  requireKycBeforeSendPayment,
}) => ({
  moduleMetadata: {
    providers: [
      provideSessionStore({
        wallet: { owner_name: name } as WalletDisplay,
        ...(onfidoCheckIsClear
          ? { onfidoCheck: { id: 'id', href: '', result: 'clear' } }
          : {}),
      }),
    ],
  },
  props: {
    balances: of(balances),
    requireKycBeforeSendPayment,
  },
});

export const Default = Template.bind({});
Default.args = {
  name: 'Test Owner',
  balances: [assetAmountAlgo(1234.56), assetAmountXrp(123.456789)],
};

export const KYCNotCleared = Template.bind({});
KYCNotCleared.args = {
  ...Default.args,
  requireKycBeforeSendPayment: true,
  onfidoCheckIsClear: false,
};

export const KYCCleared = Template.bind({});
KYCCleared.args = {
  ...Default.args,
  requireKycBeforeSendPayment: true,
  onfidoCheckIsClear: true,
};
