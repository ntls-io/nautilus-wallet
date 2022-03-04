import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SendFundsPage } from './send-funds.page';

export default {
  title: 'Views/SendFundsPage',
  component: SendFundsPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<SendFundsPage> = (args: SendFundsPage) => ({
  props: args,
});

export const Default = Template.bind({});
