import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomePage } from './home.page';

export default {
  title: 'Views/HomePage',
  component: HomePage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<HomePage> = (args: HomePage) => ({
  props: args,
});

export const Default = Template.bind({});
