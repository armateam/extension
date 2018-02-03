# ArmaTeam WebExtension  [![CircleCI](https://circleci.com/gh/armateam/extension.svg?style=svg)](https://circleci.com/gh/armateam/extension)

> WebExtension that notifies users of the availability of the ArmaTeam Twitch.tv’s channel.

## Usage

The extension is compatible with Google Chrome, Mozilla Firefox and Opera.

It can be found on the official stores:
- Google Chrome: https://chrome.google.com/webstore/detail/armateam/khcelbgmdklbglgbedjnnnccjfngpded
- Mozilla Firefox: https://addons.mozilla.org/en-US/firefox/addon/armateam/
- Opera: https://addons.opera.com/extensions/details/armateam/

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/khcelbgmdklbglgbedjnnnccjfngpded.svg)](https://chrome.google.com/webstore/detail/armateam/khcelbgmdklbglgbedjnnnccjfngpded)
[![Mozilla Add-on](https://img.shields.io/amo/v/armateam.svg)](https://addons.mozilla.org/en-US/firefox/addon/armateam/)
[![Opera Add-on](https://img.shields.io/badge/opera_addon-v1.7.0-blue.svg)](https://addons.opera.com/en/extensions/details/armateam/)


## Development

1. Install Node.js (8+) and Yarn
2. Run `yarn` to install all dependencies
3. Run `yarn dev` to run webpack in watch mode
4. Run `yarn start` to open Firefox with the extension in debugging mode

## Release

In order to release a new version, please follow the following guide.

1. Update package.json and manifest.json `version` fields to the latest version and publish a new tag.
2. Run `yarn build && yarn deploy` to build the output package.
3. Upload the output package from the `web-ext-artifacts/` directory to the various stores:
  - Google Chrome: https://chrome.google.com/webstore/developer/edit/khcelbgmdklbglgbedjnnnccjfngpded
  - Mozilla Firefox: https://addons.mozilla.org/en-US/developers/addon/armateam/edit
  - Opera: https://addons.opera.com/developer/package/228141/

## Contributing

Feel free to contribute :)

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```
![MIT](https://img.shields.io/badge/licence-MIT-blue.svg)
