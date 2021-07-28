import { Component } from '@angular/core';
import { Meta, Story } from '@storybook/angular';

export default {
  title: 'Theme',
} as Meta;

export const Theme: Story<void> = () => ThemeComponent;

const ThemeComponent: Component = {
  templateUrl: './theme.html',
};
