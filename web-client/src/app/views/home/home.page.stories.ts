import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';
import { HomePage } from './home.page';

export default {
  title: 'Views/HomePage',
  component: HomePage,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule],
      declarations: [
        HeaderComponent,
        ActionItemComponent,
        ProfileCardHorizontalComponent,
      ],
    }),
  ],
} as Meta;

const Template: Story<HomePage> = (args: HomePage) => ({
  props: args,
});

export const Default = Template.bind({});
