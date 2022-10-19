import { HttpClientModule } from '@angular/common/http';
import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { PurePayPageComponent } from '../../components/pure-pay-page/pure-pay-page.component';
import { DeleteUserService } from '../../services/delete-user.service';
import { DeleteUserPage } from './delete-user.page';

export default ionicStoryMeta<DeleteUserPage>(
  {
    title: 'Views/DeleteUserPage',
    component: DeleteUserPage,
  },
  {
    imports: [
      SharedModule,
      HttpClientModule,
      DeleteUserService,
      PurePayPageComponent,
    ],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<DeleteUserPage> = (args: DeleteUserPage) => ({
  props: args,
});

export const Default = Template.bind({});
