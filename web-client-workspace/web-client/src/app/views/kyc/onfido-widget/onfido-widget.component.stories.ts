import { Meta, Story } from '@storybook/angular';
import { OnfidoWidgetComponent } from './onfido-widget.component';

export default {
  title: 'Components/KYC/OnfidoWidgetComponent',
  component: OnfidoWidgetComponent,
} as Meta;

const Template: Story<OnfidoWidgetComponent> = (
  args: OnfidoWidgetComponent
) => ({
  props: args,
});

// Not a real token: just an empty JWT to let the widget initialise.
const PLACEHOLDER_JWT =
  'eyJhbGciOiJIUzI1NiJ9.e30.ZRrHA1JJJW8opsbCGfG_HACGpVUMN_a9IV7pAx_Zmeo';

export const Default = Template.bind({});
Default.args = {
  token: PLACEHOLDER_JWT,
};
