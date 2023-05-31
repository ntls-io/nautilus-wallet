import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PayAmountFormComponent } from './pay-amount-form.component';
import { PayAmountFormComponentModule } from './pay-amount-form.module';

export default ionicStoryMeta<PayAmountFormComponent>(
  {
    title: 'Components/Pay/PayAmountForm',
    component: PayAmountFormComponent,
  },
  {
    imports: [PayAmountFormComponentModule],
    controls: {
      shown: [
        'amountSubmitted',
        'minAmount',
        'maxAmount',
        'autofocus',
        'setInitialAmountValue',
      ],
      outputs: ['amountSubmitted'],
    },
  }
);

const Template: Story<PayAmountFormComponent> = (
  args: PayAmountFormComponent
) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {
  setInitialAmountValue: undefined,
};

export const Valid = Template.bind({});
Valid.args = { ...Default.args, setInitialAmountValue: '12.34' };

export const Empty = Template.bind({});
Empty.args = { ...Default.args, setInitialAmountValue: '' };

export const NotANumber = Template.bind({});
NotANumber.args = { ...Default.args, setInitialAmountValue: 'xxx' };

export const Negative = Template.bind({});
Negative.args = {
  ...Default.args,
  setInitialAmountValue: '-1',
};

export const BelowMinimum = Template.bind({});
BelowMinimum.args = {
  ...Default.args,
  minAmount: 0.1,
  setInitialAmountValue: '0.01',
};

export const AboveMaximum = Template.bind({});
AboveMaximum.args = {
  ...Default.args,
  maxAmount: 1000,
  setInitialAmountValue: '2000',
};
