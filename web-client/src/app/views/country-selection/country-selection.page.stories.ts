import { Meta, Story } from '@storybook/angular';
import { CountrySelectionPage } from './country-selection.page';

export default {
  title: 'Views/CountrySelectionPage',
  component: CountrySelectionPage,
} as Meta;

const Template: Story<CountrySelectionPage> = (args: CountrySelectionPage) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  // Disable autofocus by default, for consistent Chromatic snapshots
  isBusy: false,
  countries: [
    {
      flags: {
        png: 'https://flagcdn.com/w320/pg.png',
        svg: 'https://flagcdn.com/pg.svg',
      },
      name: {
        common: 'Papua New Guinea',
        official: 'Independent State of Papua New Guinea',
        nativeName: {
          eng: {
            official: 'Independent State of Papua New Guinea',
            common: 'Papua New Guinea',
          },
          hmo: {
            official: 'Independen Stet bilong Papua Niugini',
            common: 'Papua Niu Gini',
          },
          tpi: {
            official: 'Independen Stet bilong Papua Niugini',
            common: 'Papua Niugini',
          },
        },
      },
      idd: {
        root: '+6',
        suffixes: ['75'],
      },
    },
    {
      flags: {
        png: 'https://flagcdn.com/w320/bv.png',
        svg: 'https://flagcdn.com/bv.svg',
      },
      name: {
        common: 'Bouvet Island',
        official: 'Bouvet Island',
        nativeName: {
          nor: {
            official: 'Bouvetøya',
            common: 'Bouvetøya',
          },
        },
      },
      idd: {
        root: '+4',
        suffixes: ['7'],
      },
    },
  ],
  filteredCountries: [
    {
      flags: {
        png: 'https://flagcdn.com/w320/pg.png',
        svg: 'https://flagcdn.com/pg.svg',
      },
      name: {
        common: 'Papua New Guinea',
        official: 'Independent State of Papua New Guinea',
        nativeName: {
          eng: {
            official: 'Independent State of Papua New Guinea',
            common: 'Papua New Guinea',
          },
          hmo: {
            official: 'Independen Stet bilong Papua Niugini',
            common: 'Papua Niu Gini',
          },
          tpi: {
            official: 'Independen Stet bilong Papua Niugini',
            common: 'Papua Niugini',
          },
        },
      },
      idd: {
        root: '+6',
        suffixes: ['75'],
      },
    },
  ],
};
