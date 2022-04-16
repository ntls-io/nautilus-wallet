import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Story } from '@storybook/angular';
import { PinEntryComponentModule } from 'src/app/components/pin-entry/pin-entry.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletAccessPage } from 'src/app/views/wallet-access/wallet-access.page';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';

export default ionicStoryMeta<WalletAccessPage>(
  {
    title: 'Views/WalletAccessPage',
    component: WalletAccessPage,
    argTypes: {},
  },
  {
    imports: [
      HttpClientTestingModule,
      FormsModule,
      SharedModule,
      PinEntryComponentModule,
    ],
    controls: {
      shown: ['isPinEntryOpen', 'hasCamera', 'address', 'onPinConfirmed'],
      outputs: ['onPinConfirmed'],
    },
    layoutType: 'page',
  }
);

const Template: Story<WalletAccessPage> = (args: WalletAccessPage) => ({
  props: args,
});

export const NoCamera = Template.bind({});
NoCamera.args = { hasCamera: false };

export const WithCamera = Template.bind({});
WithCamera.args = { hasCamera: true };

export const EmptyAddress = Template.bind({});
EmptyAddress.args = { ...NoCamera.args, address: ' ' };

export const ValidAddress = Template.bind({});
ValidAddress.args = { ...NoCamera.args, address: '1234567890' };

export const PinEntryModal = Template.bind({});
PinEntryModal.args = { ...ValidAddress.args, isPinEntryOpen: true };
