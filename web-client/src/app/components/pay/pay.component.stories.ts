/* eslint-disable @typescript-eslint/await-thenable */ // For the interactionsDebugger feature

import { Story } from '@storybook/angular';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import {
  PayFromToAlgoArgs,
  PayFromToXRPArgs,
} from 'src/app/components/pay-from-to/pay-from-to.component.stories';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PayComponent, PaymentOption } from './pay.component';
import { PayComponentModule } from './pay.module';

export default ionicStoryMeta<PayComponent>(
  {
    title: 'Components/Pay/Pay',
    component: PayComponent,
  },
  {
    imports: [PayComponentModule],
    controls: {
      shown: ['paymentOptions', 'paymentSubmitted'],
      outputs: ['paymentSubmitted'],
    },
  }
);

const algoOption: PaymentOption = {
  senderName: PayFromToAlgoArgs.name,
  senderBalance: PayFromToAlgoArgs.balance,
  receiverAddress: PayFromToAlgoArgs.receiverAddress,
};

const xrpOption: PaymentOption = {
  senderName: PayFromToXRPArgs.name,
  senderBalance: PayFromToXRPArgs.balance,
  receiverAddress: PayFromToXRPArgs.receiverAddress,
};

/** This component needs more than the default 1 second to load. */
const LOAD_TIMEOUT: milliseconds = 8_000;
type milliseconds = number;

const Template: Story<PayComponent> = (args: PayComponent) => ({
  props: {
    ...args,
    autofocus: false, // For Chromatic snapshots
  },
});

export const OneOption = Template.bind({});
OneOption.args = {
  paymentOptions: [{ ...algoOption }],
};

export const PayAmount = Template.bind({});
PayAmount.args = { ...OneOption.args };
PayAmount.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // First wait for the Pay button to be ready, to give the page time to initialise.
  const payButton = await canvas.findByText(
    /Pay/i,
    { selector: 'ion-button.hydrated' },
    { timeout: LOAD_TIMEOUT }
  );

  // canvas.type() doesn't seem to work with ion-input, so enter the value directly here.
  const amountInput = canvasElement.querySelector<HTMLIonInputElement>(
    'ion-input[placeholder="Amount"]'
  );
  if (amountInput === null) throw new Error('missing Amount input');
  amountInput.value = '100';

  // Wait for the button to become enabled before clicking it.
  await waitFor(() => {
    if (payButton.hasAttribute('disabled')) throw new Error();
  });
  await userEvent.click(payButton);
};

export const TwoOptions = Template.bind({});
TwoOptions.args = {
  paymentOptions: [{ ...algoOption }, { ...xrpOption }],
};

export const ChangeAccount = Template.bind({});
ChangeAccount.args = { ...TwoOptions.args };
ChangeAccount.play = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  await userEvent.click(
    await canvas.findByText(
      'Change account',
      { selector: 'ion-button.hydrated' },
      { timeout: LOAD_TIMEOUT }
    )
  );
};

export const ChangedAccount = Template.bind({});
ChangedAccount.args = { ...ChangeAccount.args };
ChangedAccount.play = async (context): Promise<void> => {
  const { canvasElement } = context;
  const canvas = within(canvasElement);

  await ChangeAccount.play?.(context);

  await userEvent.click(
    await canvas.findByText('XRP', {
      selector: 'ion-popover.hydrated *',
    })
  );
};

export const NoOptions = Template.bind({});
NoOptions.args = {};
