import { Story } from '@storybook/angular';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { TransactionFeesComponent } from './transaction-fees.component';
import { TransactionFeesComponentModule } from './transaction-fees.module';

export default ionicStoryMeta<TransactionFeesComponent>(
  {
    title: 'Components/TransactionFees',
    component: TransactionFeesComponent,
  },
  {
    imports: [TransactionFeesComponentModule],
    controls: {},
  }
);

const Template: Story<TransactionFeesComponent> = (
  args: TransactionFeesComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  balance: assetAmountXrp(123.456789),
  transactionAmount: 123,
};
