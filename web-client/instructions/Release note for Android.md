# Release note for Android

## Prerequisite
* Android studio

## [Configuration](https://capacitorjs.com/docs/android/configuration#configuring-androidmanifestxml)

Android apps manage permissions, device features, and other settings in the `AndroidManifest.xml` file, which is located at `android/app/src/main/AndroidManifest.xml`.

### [Changing the Package ID](https://capacitorjs.com/docs/android/configuration#changing-the-package-id)

To change your app’s Package ID (aka Application ID for Android), edit `applicationId` at the top of `android/app/build.gradle`

> **Note**: you can also edit the version name & version code in the same file


## [Open Android Studio](https://capacitorjs.com/docs/android#opening-the-android-project)

To open the project in Android Studio, run:

`$ ionic capacitor open android`

> Alternatively, you can open Android Studio and import the android/ directory as an Android Studio project.


[![Android studio](https://i.postimg.cc/jShx1V5V/Screenshot-2022-01-27-at-17-40-34.png)](https://postimg.cc/yDkCJbcn)

## Generate signed Bundle steps

![Select build menu](https://i.postimg.cc/66r9HH0x/Screenshot-2022-01-27-at-19-43-33.png)

![Select Bundle or APK](https://i.postimg.cc/15VKhq8S/Screenshot-2022-01-27-at-19-50-21.png)

![Fill signing details](https://i.postimg.cc/NjsChxrn/Screenshot-2022-01-27-at-20-26-47.png)

![Select build type](https://i.postimg.cc/sfTnRWsH/Screenshot-2022-01-27-at-20-12-33.png)

![Success](https://i.postimg.cc/kgLjVPp0/Screenshot-2022-01-27-at-20-38-20.png)

## Upload signed Bundle

![Select app](https://i.postimg.cc/V6TspRLQ/Screenshot-2022-01-27-at-20-54-33.png)
![Select track](https://i.postimg.cc/3x7GtKcj/Screenshot-2022-01-27-at-20-54-43.png)
![Create release](https://i.postimg.cc/Y2GQ9DFF/Screenshot-2022-01-27-at-20-54-54.png)
![Upload bundle](https://i.postimg.cc/MZCVj00F/Screenshot-2022-01-27-at-20-55-03.png)
![Release notes](https://i.postimg.cc/Fs0cbfDs/Screenshot-2022-01-27-at-20-55-24.png)