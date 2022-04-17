import { Story } from '@storybook/angular';
import { PayAmountConfirmComponent } from 'src/app/components/pay-amount-confirm/pay-amount-confirm.component';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';

export default ionicStoryMeta<PayAmountConfirmComponent>({
  title: 'Components/PayAmountConfirm',
  component: PayAmountConfirmComponent,
});

const Template: Story<PayAmountConfirmComponent> = (
  args: PayAmountConfirmComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
