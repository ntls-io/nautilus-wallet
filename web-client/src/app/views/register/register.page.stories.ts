import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RegisterPage } from './register.page';

export default {
  title: 'Views/RegisterPage',
  component: RegisterPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

const Template: Story<RegisterPage> = (args: RegisterPage) => ({
  props: args,
});

export const Default = Template.bind({});
