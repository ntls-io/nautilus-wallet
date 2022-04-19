import { HttpClientModule } from '@angular/common/http';
import { Story } from '@storybook/angular';
import { TranslocoRootModule } from 'src/app/transloco/transloco-root.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { LandingPage } from './landing.page';

export default ionicStoryMeta<LandingPage>(
  {
    title: 'Views/LandingPage',
    component: LandingPage,
  },
  {
    imports: [
      // TODO: Migrate to HttpClientTestingModule and TranslocoTestingModule
      HttpClientModule,
      TranslocoRootModule,
    ],
    layoutType: 'page',
  }
);

const Template: Story<LandingPage> = (args: LandingPage) => ({
  props: args,
});

export const Default = Template.bind({});
