import { Story } from '@storybook/angular';
import { PayComponent } from 'src/app/components/pay/pay.component';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';

export default ionicStoryMeta<PayComponent>({
  title: 'Components/Pay',
  component: PayComponent,
});

const Template: Story<PayComponent> = (args: PayComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
