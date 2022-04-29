import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PureWalletPageComponent } from './pure-wallet-page.component';
import { PureWalletPageComponentModule } from './pure-wallet-page.module';

export default ionicStoryMeta<PureWalletPageComponent>(
  {
    title: 'Components/PureWalletPage',
    component: PureWalletPageComponent,
  },
  {
    imports: [PureWalletPageComponentModule],
  }
);

const Template: Story<PureWalletPageComponent> = (
  args: PureWalletPageComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
