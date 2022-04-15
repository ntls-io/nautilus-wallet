import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PinEntryComponent } from './pin-entry.component';

export default ionicStoryMeta<PinEntryComponent>({
  title: 'Components/PinEntryComponent',
  component: PinEntryComponent,
});

const Template: Story<PinEntryComponent> = (args: PinEntryComponent) => ({
  props: args,
});

export const Default = Template.bind({});
