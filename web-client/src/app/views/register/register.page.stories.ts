import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule]
    })
  ]
} as Meta;

const Template: Story<RegisterPage> = (args: RegisterPage) => ({
  props: args,
});

export const Default = Template.bind({});
