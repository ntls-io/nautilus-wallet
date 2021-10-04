import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SessionState } from 'src/app/stores/session/session.store';
import {
  provideActivatedRouteQueryParams,
  provideSessionStore,
} from 'src/stories/storybook.helpers';
import { PayPage } from './pay.page';

export default {
  title: 'Views/PayPage',
  component: PayPage,
  decorators: [
    moduleMetadata({
      imports: [SharedModule],
    }),
  ],
} as Meta;

type Args = { receiverAddress: string } & SessionState;

const Template: Story<Args> = ({ receiverAddress, ...state }: Args) => ({
  moduleMetadata: {
    providers: [
      provideActivatedRouteQueryParams({ receiverAddress }),
      provideSessionStore(state),
    ],
  },
});

export const Default = Template.bind({});
Default.args = {
  name: 'Test Owner',
  balance: 1234,
  receiverAddress: 'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
};
