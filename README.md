# st-retrospect-mobile
![Node.js CI](https://github.com/dh-center/st-retrospect-mobile/workflows/Node.js%20CI/badge.svg?branch=master&event=push)

Mobile navigation app that offers routes you will like.

Mockups: https://marvelapp.com/9d06b61

### Setup

#### General

Create `.env` file at the root of the project with the following content:
`GOOGLE_DIRECTIONS_API_KEY=<YOUR_KEY>`
This will be the key used to make requests to Google Directions API. 

#### Android

You will need Android Studio installed and a device/emulator.
Refer to [React Native docs](https://facebook.github.io/react-native/docs/getting-started).

- List all emulators:
`emulator -list-avds`

- Run emulator
`emulator @<emulator_name>`

- Run app on emulator/device
`npm run android`

#### iOS

You will need macOS, XCode installed and a device/emulator. 

- Install dependencies 
`pod install`

- Run app on emulator/device
`npm run ios`
