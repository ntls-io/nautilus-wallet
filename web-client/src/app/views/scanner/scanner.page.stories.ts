import { Story } from '@storybook/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { ScannerPage } from './scanner.page';

export default ionicStoryMeta<ScannerPage>(
  {
    title: 'Views/ScannerPage',
    component: ScannerPage,
  },
  {
    imports: [ZXingScannerModule],
    controls: { shown: [] },
    layoutType: 'page',
  }
);

const Template: Story<ScannerPage> = (args: ScannerPage) => ({
  props: args,
});

export const Default = Template.bind({});
