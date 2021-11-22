import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PayFromToComponent } from './pay-from-to.component';

export default {
  title: 'Components/PayFromTo',
  component: PayFromToComponent,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<PayFromToComponent> = (args: PayFromToComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  name: 'Test Owner',
  balance: 1234,
  receiverAddress: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
