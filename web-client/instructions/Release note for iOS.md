# Release note for iOS

## Prerequisite
* Xcode 12+
* [CocoaPods](https://capacitorjs.com/docs/getting-started/environment-setup#cocoapods)


## [Open Xcode](https://capacitorjs.com/docs/ios#opening-the-ios-project)

To open the project in Xcode, run:

`$ ionic capacitor open ios`

> Alternatively, you can open Xcode manually by running `open ios/App/App.xcworkspace`.

## [Configuration](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)

The `Info.plist` file is the main configuration file for iOS apps. You may need to edit it whenever a Capacitor plugin requires new settings or permissions.

The file can be found in `ios/App/App/Info.plist `.

![Info.plist](https://i.postimg.cc/D0c8NMGg/Screenshot-2022-02-01-at-09-50-53.png)


> **Note**: you can also edit the Bundle version & Bundle version string (short) in the same file or in the target's General tab



![General](https://i.postimg.cc/L4DB2pVy/Screenshot-2022-02-03-at-09-49-45.png)


## [Setting Capabilities](https://capacitorjs.com/docs/ios/configuration#setting-capabilities)

![Signing & Capabilities](https://i.postimg.cc/fyzcm2Mj/Screenshot-2022-02-03-at-09-30-32.png)

Capabilities are used to enable key features that your app may need. You may need to configure them whenever a Capacitor plugin requires it.

Unlike other configuration options and usage descriptions, capabilities are not configured in `Info.plist`.

To add a new capability, open your app in Xcode, select the App project and the App target, click Signing & Capabilities in the tab bar, and then click the + Capability button. See [this article](https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app) for more information about iOS capabilities.


## Deploying to App Store (TestFlight)

![Archive app](https://i.postimg.cc/tJBh53T0/Screenshot-2022-02-03-at-09-50-23.png)
![Distribute app](https://i.postimg.cc/5NP3qVYH/Screenshot-2022-02-03-at-09-52-02.png)
![Distribution method](https://i.postimg.cc/QM7J3K65/Screenshot-2022-02-03-at-09-52-07.png)
![Select destination](https://i.postimg.cc/Jzv5v5QM/Screenshot-2022-02-03-at-09-52-11.png)
![Distribution options](https://i.postimg.cc/Ssp7NQ5P/Screenshot-2022-02-03-at-09-52-27.png)
![Signing methods](https://i.postimg.cc/XYpgszds/Screenshot-2022-02-03-at-09-52-30.png)
![Select app](https://i.postimg.cc/ZKYHdRRt/Screenshot-2022-02-03-at-09-53-32.png
)