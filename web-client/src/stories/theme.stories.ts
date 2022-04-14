import { Component } from '@angular/core';
import { Meta, Story } from '@storybook/angular';

export default {
  title: 'Theme',
} as Meta;

export const Theme: Story<void> = () => ThemeComponent;

// FIXME(2022-03-14, Pi): Upgrading to Angular 13 seems to have broken using templateUrl,
//                        but using an inline template still works, as a workaround for now.
const template = `
<ion-content>
  <ion-grid fixed>
    <h1>Nautilus theme</h1>

    Based on the
    <a
      href="https://www.figma.com/file/zYVHu1EwCIDCbQp8rFscyA/Nautilus-Branding?node-id=23%3A128"
      >Nautilus Branding UI Kit</a
    >.

    <ion-card>
      <ion-card-header
        ><ion-card-title>Ionic Colors</ion-card-title
        ><ion-card-subtitle
          >(see
          <a href="https://ionicframework.com/docs/theming/colors">docs</a
          >)</ion-card-subtitle
        ></ion-card-header
      >
      <ion-card-content>
        <div>
          <ion-button shape="round" color="primary">Primary</ion-button>
          <ion-button shape="round" color="secondary">Secondary</ion-button>
          <ion-button shape="round" color="tertiary">Tertiary</ion-button>
        </div>

        <div>
          <ion-button shape="round" color="success">Success</ion-button>
          <ion-button shape="round" color="warning">Warning</ion-button>
          <ion-button shape="round" color="danger">Danger</ion-button>
        </div>

        <div>
          <ion-button shape="round" color="light">Light</ion-button>
          <ion-button shape="round" color="medium">Medium</ion-button>
          <ion-button shape="round" color="dark">Dark</ion-button>
        </div></ion-card-content
      >
    </ion-card>

    <ion-card>
      <ion-card-header><ion-card-title>Outlines</ion-card-title></ion-card-header>
      <ion-card-content>
        <div>
          <ion-button shape="round" fill="outline" color="primary"
            >Primary</ion-button
          >
          <ion-button shape="round" fill="outline" color="secondary"
            >Secondary</ion-button
          >
          <ion-button shape="round" fill="outline" color="tertiary"
            >Tertiary</ion-button
          >
        </div>

        <div>
          <ion-button shape="round" fill="outline" color="success"
            >Success</ion-button
          >
          <ion-button shape="round" fill="outline" color="warning"
            >Warning</ion-button
          >
          <ion-button shape="round" fill="outline" color="danger"
            >Danger</ion-button
          >
        </div>

        <div>
          <ion-button shape="round" fill="outline" color="light"
            >Light</ion-button
          >
          <ion-button shape="round" fill="outline" color="medium"
            >Medium</ion-button
          >
          <ion-button shape="round" fill="outline" color="dark">Dark</ion-button>
        </div></ion-card-content
      >
    </ion-card>
  </ion-grid>
</ion-content>
`;

const ThemeComponent: Component = {
  template,
};
