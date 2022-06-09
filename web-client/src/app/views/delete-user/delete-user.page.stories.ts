import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { DeleteUserPage } from './delete-user.page';
import { HttpClientModule } from '@angular/common/http';
import { BalanceSummaryCardComponentModule } from 'src/app/components/balance-summary-card/balance-summary-card.module';


export default ionicStoryMeta<DeleteUserPage>(
  {
    title: 'Views/DeleteUserPage',
    component: DeleteUserPage,
  },
  {
    imports: [SharedModule, HttpClientModule, BalanceSummaryCardComponentModule],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<DeleteUserPage> = (args: DeleteUserPage) => ({
  props: args,
});

export const Default = Template.bind({});
