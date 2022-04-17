import { Story } from '@storybook/angular';
import { PayAmountFormComponent } from 'src/app/components/pay-amount-form/pay-amount-form.component';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';

export default ionicStoryMeta<PayAmountFormComponent>({
  title: 'Components/PayAmountForm',
  component: PayAmountFormComponent,
});

const Template: Story<PayAmountFormComponent> = (
  args: PayAmountFormComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
