import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { KycPageModule } from './kyc.module';
import { KycPage } from './kyc.page';
import * as OnfidoWidgetComponentStories from './onfido-widget/onfido-widget.component.stories';

export default {
  title: 'Views/KycPage',
  component: KycPage,
  decorators: [
    moduleMetadata({
      imports: [KycPageModule],
    }),
  ],
} as Meta;

const Template: Story<KycPage> = (args: KycPage) => ({
  props: args,
});

export const Default = Template.bind({});

export const WithToken = Template.bind({});
WithToken.args = {
  token: OnfidoWidgetComponentStories.Default.args?.token,
};
