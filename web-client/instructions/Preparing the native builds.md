# Preparing the native builds

## [Build](https://ionicframework.com/docs/cli/commands/build)

`$ ionic build [options]`

Will perform an Ionic build, which compiles web assets and prepares them for deployment.

`ionic build` uses the Angular CLI.

> use `--prod` for an optimized production web build

## [Add Platforms](https://ionicframework.com/docs/cli/commands/capacitor-add)

`ionic capacitor add` will do the following:

* Install the Capacitor platform package
* Copy the native platform template into your project

| iOS | Android |
|-----|---------|
|`$ ionic capacitor add ios`| `$ ionic capacitor add android` |



## [Build Platforms](https://ionicframework.com/docs/cli/commands/capacitor-build)

`$ ionic capacitor build [options] `

will do the following:

* Perform ionic build
* Copy web assets into the specified native platform
* Open the IDE for your native project (Xcode for iOS, Android Studio for Android)

| iOS | Android |
|-----|---------|
|`$ ionic capacitor build ios`| `$ ionic capacitor build android` |

> use `--prod` for optimized production native builds

## [Sync Platforms](https://ionicframework.com/docs/cli/commands/capacitor-sync)

`$ ionic capacitor sync [options]`

Will do the following:

* Perform an Ionic build, which compiles web assets
* Copy web assets to Capacitor native platform(s)
* Update Capacitor native platform(s) and dependencies
* Install any discovered Capacitor or Cordova plugins

| iOS | Android |
|-----|---------|
|`$ ionic capacitor sync ios`| `$ ionic capacitor sync android` |

> use `--prod` for optimized production native builds

## [Update Platforms](https://ionicframework.com/docs/cli/commands/capacitor-update)

`$ ionic capacitor update [options]`

Will do the following:

* Update Capacitor native platform(s) and dependencies
* Install any discovered Capacitor or Cordova plugins

| iOS | Android |
|-----|---------|
|`$ ionic capacitor sync ios`| `$ ionic capacitor sync android` |

> use `--prod` for optimized production native builds


## [Creating Splash Screens and Icons](https://capacitorjs.com/docs/guides/splash-screens-and-icons)

First, install `cordova-res`:

`npm install -g cordova-res`

Next, run the following to generate all images then copy them into the native projects:

| iOS | Android |
|-----|---------|
|`$ cordova-res ios --skip-config --copy`| `$ cordova-res android --skip-config --copy` |