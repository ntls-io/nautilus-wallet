import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PayPage } from './pay.page';

export default {
  title: 'Views/PayPage',
  component: PayPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<PayPage> = (args: PayPage) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  wallet: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
