import { Meta, Story } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
  title: 'Components/HeaderComponent',
  component: HeaderComponent,
} as Meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
