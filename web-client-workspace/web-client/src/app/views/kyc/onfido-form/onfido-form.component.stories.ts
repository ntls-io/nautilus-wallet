import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { KycPageModule } from '../kyc.module';
import { OnfidoFormComponent } from './onfido-form.component';

export default {
  title: 'Components/KYC/OnfidoFormComponent',
  component: OnfidoFormComponent,
  decorators: [
    moduleMetadata({
      imports: [KycPageModule],
    }),
  ],
} as Meta;

const Template: Story<OnfidoFormComponent> = (args: OnfidoFormComponent) => ({
  props: args,
});

export const Empty = Template.bind({});

export const Filled = Template.bind({});
Filled.args = {
  firstName: 'First',
  lastName: 'Last',
};
