<h1 align="center">React Native Engineering Challenge 🍬</h1>

<p align="center">This is an test project to showcase good React Native engineering practices</p>

## Quick Start
This project uses [Expo Managed Workflow](https://docs.expo.dev/introduction/managed-vs-bare/#managed-workflow) for faster development process and easier access to test and run the application, if you do not have Expo installed locally on your machine, please install it according to [this doc](https://docs.expo.dev/get-started/installation/#installing-expo-cli).

1. Clone this repository `git@github.com:Petr-tsvetkov31/rn-eng-challenge-emma.git`
2. Go into cloned project repository `cd rn-eng-challenge-emma`
3. Install JS dependencies `yarn install`
4. Run project on iOS `yarn ios` or Android `yarn android` simulator

## Commands
- `yarn start` - starts react-native metro bundler
- `yarn android` - starts the app in Android emulator
- `yarn ios` - starts the app in iOS simulator
- `yarn format-lint` - formats and checks the code

## Notes

- This project is using TypeScript, ESLint and Prettier to in inform and correct some of errors and typos. I'm extending Expo's eslint config [eslint-config-universe](https://github.com/expo/expo/tree/master/packages/eslint-config-universe) + `eslint-plugin-react-hooks`
- To check before committing code I'm using husky + lint-staged