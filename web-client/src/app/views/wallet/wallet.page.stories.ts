import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { WalletPage } from './wallet.page';

export default {
  title: 'Views/WalletPage',
  component: WalletPage,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
      declarations: [HeaderComponent, ActionItemComponent],
    }),
  ],
} as Meta;

const Template: Story<WalletPage> = (args: WalletPage) => ({
  props: args,
});

export const Default = Template.bind({});
