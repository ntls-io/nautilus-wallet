import { Story } from '@storybook/angular';
import { PinEntryComponentModule } from 'src/app/components/pin-entry/pin-entry.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PinEntryComponent } from './pin-entry.component';

export default ionicStoryMeta<PinEntryComponent>(
  {
    title: 'Components/PinEntryComponent',
    component: PinEntryComponent,
  },
  {
    imports: [PinEntryComponentModule],
    controls: {
      shown: [
        'pinConfirmed',
        'minLength',
        'maxLength',
        'autofocus',
        'setInitialPinValue',
      ],
      outputs: ['pinConfirmed'],
    },
  }
);

const Template: Story<PinEntryComponent> = (args: PinEntryComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  // Disable autofocus by default, for consistent Chromatic snapshots
  autofocus: false,
  setInitialPinValue: undefined,
};

export const Valid = Template.bind({});
Valid.args = { ...Default.args, setInitialPinValue: '12345' };

export const Empty = Template.bind({});
Empty.args = { setInitialPinValue: '' };

export const TooShort = Template.bind({});
TooShort.args = { ...Default.args, setInitialPinValue: '123' };

export const TooLong = Template.bind({});
TooLong.args = { ...Default.args, setInitialPinValue: '12345678901' };

export const NonDigits = Template.bind({});
NonDigits.args = { ...Default.args, setInitialPinValue: 'abcde' };
