import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { OnfidoWidgetComponent } from './onfido-widget.component';

export default ionicStoryMeta<OnfidoWidgetComponent>(
  {
    title: 'Components/KYC/OnfidoWidgetComponent',
    component: OnfidoWidgetComponent,
  },
  {
    controls: {
      hidden: ['onfidoHandle', 'getToken'],
      outputs: ['completed'],
    },
  }
);

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
