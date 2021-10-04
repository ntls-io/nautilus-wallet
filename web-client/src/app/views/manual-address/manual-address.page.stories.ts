import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ManualAddressPage } from './manual-address.page';

export default {
  title: 'Views/ManualAddressPage',
  component: ManualAddressPage,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, ReactiveFormsModule, SharedModule],
    }),
  ],
} as Meta;

const Template: Story<ManualAddressPage> = (args: ManualAddressPage) => ({
  props: args,
});

export const Default = Template.bind({});
