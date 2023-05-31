import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { KycPageModule } from '../kyc.module';
import { OnfidoFormComponent } from './onfido-form.component';

export default ionicStoryMeta<OnfidoFormComponent>(
  {
    title: 'Components/KYC/OnfidoFormComponent',
    component: OnfidoFormComponent,
  },
  {
    imports: [KycPageModule],
    controls: {
      outputs: ['submitted'],
      hidden: ['nameForm', 'onSubmit'],
    },
  }
);

const Template: Story<OnfidoFormComponent> = (args: OnfidoFormComponent) => ({
  props: args,
});

export const Empty = Template.bind({});

export const Filled = Template.bind({});
Filled.args = {
  firstName: 'First',
  lastName: 'Last',
};
