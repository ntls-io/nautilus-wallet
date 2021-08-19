import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReceivePage } from './receive.page';

export default {
  title: 'Views/ReceivePage',
  component: ReceivePage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<ReceivePage> = (args: ReceivePage) => ({
  props: args,
});

export const Default = Template.bind({});
