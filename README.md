# Temporary plan

fix crash [Animated node with tag (child) [xxxx] does not exist](https://github.com/facebook/react-native/issues/33686)

# Home to use

```javascript
//
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "babel-plugin-rn-disable-native-divider",
      {
        targetSdkVersion: 30, // Greater than 30, default 30, Android 11 code is 31
      },
    ],
    // ....
  ],
};
```