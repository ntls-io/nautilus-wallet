import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Story } from '@storybook/angular';
import { ionicStoryMeta } from 'src/stories/storybook.helpers';
import { KycPageModule } from './kyc.module';
import { KycPage } from './kyc.page';
import * as OnfidoWidgetComponentStories from './onfido-widget/onfido-widget.component.stories';

export default ionicStoryMeta<KycPage>(
  {
    title: 'Views/KycPage',
    component: KycPage,
  },
  {
    imports: [HttpClientTestingModule, KycPageModule],
    controls: {
      shown: ['viewState', 'token', 'onfidoStarted', 'sdkResponse', 'check'],
    },
    layoutType: 'page',
  }
);

const Template: Story<KycPage> = (args: KycPage) => ({
  props: args,
});

export const Step1_Form = Template.bind({});

export const Step2_Widget = Template.bind({});
Step2_Widget.args = {
  viewState: 'step2_widget',
  token: OnfidoWidgetComponentStories.Default.args?.token,
};

export const Step3_CheckInProgress = Template.bind({});
Step3_CheckInProgress.args = {
  viewState: 'step3_result',
  check: {
    id: '111111111-1111-1111-1111-111111111111',
    created_at: '2021-10-12T17:39:22Z',
    href: '/v3.2/checks/111111111-1111-1111-1111-111111111111',
    status: 'in_progress',
    results_uri:
      'https://dashboard.onfido.com/checks/111111111-1111-1111-1111-111111111111',
    applicant_id: '000000000-0000-0000-0000-000000000000',
    tags: [],
    applicant_provides_data: false,
    report_ids: [
      '222222222-2222-2222-2222-222222222222',
      '333333333-3333-3333-3333-333333333333',
    ],
  },
};

export const Step3_CheckComplete = Template.bind({});
Step3_CheckComplete.args = {
  viewState: 'step3_result',
  check: {
    id: '111111111-1111-1111-1111-111111111111',
    created_at: '2021-10-12T17:39:22Z',
    href: '/v3.2/checks/111111111-1111-1111-1111-111111111111',
    status: 'complete',
    result: 'clear',
    results_uri:
      'https://dashboard.onfido.com/checks/111111111-1111-1111-1111-111111111111',
    applicant_id: '000000000-0000-0000-0000-000000000000',
    tags: [],
    applicant_provides_data: false,
    report_ids: [
      '222222222-2222-2222-2222-222222222222',
      '333333333-3333-3333-3333-333333333333',
    ],
  },
};
