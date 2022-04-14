import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ManualAddressPage } from './manual-address.page';

export default ionicStoryMeta<ManualAddressPage>(
  {
    title: 'Views/ManualAddressPage',
    component: ManualAddressPage,
  },
  {
    imports: [RouterTestingModule, ReactiveFormsModule, SharedModule],
    controls: {
      shown: ['onSubmit'],
      outputs: ['onSubmit'],
    },
    layoutType: 'page',
  }
);

const Template: Story<ManualAddressPage> = (args: ManualAddressPage) => ({
  props: args,
});

export const Default = Template.bind({});
