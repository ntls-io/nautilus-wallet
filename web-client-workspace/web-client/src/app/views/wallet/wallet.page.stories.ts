import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SessionState } from 'src/app/stores/session/session.store';
import { provideSessionStore } from 'src/stories/storybook.helpers';
import { WalletPage } from './wallet.page';

export default {
  title: 'Views/WalletPage',
  component: WalletPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<SessionState> = (state: SessionState) => ({
  moduleMetadata: {
    providers: [provideSessionStore(state)],
  },
});

export const Default = Template.bind({});
Default.args = { name: 'Test Owner' };
