import { Story } from '@storybook/angular';
import {
  PayFromToAlgoArgs,
  PayFromToXRPArgs,
} from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PayAmountConfirmComponent } from './pay-amount-confirm.component';
import { PayAmountConfirmComponentModule } from './pay-amount-confirm.module';

export default ionicStoryMeta<PayAmountConfirmComponent>(
  {
    title: 'Components/Pay/PayAmountConfirm',
    component: PayAmountConfirmComponent,
  },
  {
    imports: [PayAmountConfirmComponentModule],
    controls: {
      shown: ['name', 'balance', 'receiverAddress', 'amountConfirmed'],
      outputs: ['amountConfirmed'],
    },
  }
);

const Template: Story<PayAmountConfirmComponent> = (
  args: PayAmountConfirmComponent
) => ({
  props: {
    ...args,
    autofocus: false, // For Chromatic snapshots
  },
});

export const WithAlgo = Template.bind({});
WithAlgo.args = { ...PayFromToAlgoArgs };

export const WithXRP = Template.bind({});
WithXRP.args = { ...PayFromToXRPArgs };
