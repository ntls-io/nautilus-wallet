import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { DepositFundsPage } from './deposit-funds.page';

export default ionicStoryMeta<DepositFundsPage>(
  {
    title: 'Views/DepositFundsPage',
    component: DepositFundsPage,
  },
  {
    imports: [HttpClientTestingModule, SharedModule],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<DepositFundsPage> = (args: DepositFundsPage) => ({
  props: args,
});

export const Default = Template.bind({});
