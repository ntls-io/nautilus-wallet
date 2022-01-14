import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScannerPage } from './scanner.page';

export default {
  title: 'Views/ScannerPage',
  component: ScannerPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<ScannerPage> = (args: ScannerPage) => ({
  props: args,
});

export const Default = Template.bind({});
