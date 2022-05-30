import { ReactiveFormsModule } from '@angular/forms';
import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { BecomeConnectorPage } from './become-connector.page';

export default ionicStoryMeta<BecomeConnectorPage>(
  {
    title: 'Views/BecomeConnectorPage',
    component: BecomeConnectorPage,
  },
  {
    imports: [ReactiveFormsModule, SharedModule],
    layoutType: 'page',
  }
);

const Template: Story<BecomeConnectorPage> = (args: BecomeConnectorPage) => ({
  props: args,
});

export const Default = Template.bind({});
