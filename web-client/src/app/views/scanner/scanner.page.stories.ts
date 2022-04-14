import { Story } from '@storybook/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ScannerPage } from './scanner.page';

export default ionicStoryMeta<ScannerPage>(
  {
    title: 'Views/ScannerPage',
    component: ScannerPage,
  },
  {
    imports: [SharedModule],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<ScannerPage> = (args: ScannerPage) => ({
  props: args,
});

export const Default = Template.bind({});
