import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AccountState } from 'src/app/stores/account';
import { provideAccountStore } from 'src/stories/storybook.helpers';
import { AccountsPage } from './accounts.page';

export default {
  title: 'Views/AccountsPage',
  component: AccountsPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

const Template: Story<AccountState> = (state: AccountState) => ({
  moduleMetadata: {
    providers: [provideAccountStore(state)],
  },
});

export const Default = Template.bind({});
