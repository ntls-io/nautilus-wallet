import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PrintWalletPage } from './print-wallet.page';

export default {
  title: 'Views/PrintWalletPage',
  component: PrintWalletPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<PrintWalletPage> = (args: PrintWalletPage) => ({
  props: args,
});

export const Default = Template.bind({});
