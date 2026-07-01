# Karma Health — React Native Demo App

A cross-platform (iOS, Android, Web) demo app built with [Expo](https://expo.dev) and [Kontent.ai](https://kontent.ai), showcasing content-driven mobile development for a healthcare brand.

> [!WARNING]
> This app bundles the Kontent.ai API key into the client bundle via `EXPO_PUBLIC_` environment variables. This is acceptable for demos and preview purposes, but in a production application you should use a backend proxy to keep API keys server-side.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and fill in your Kontent.ai credentials

   ```bash
   cp .env.example .env
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Regenerating the model

The content model TypeScript types are generated from your Kontent.ai environment using [`@kontent-ai/model-generator`](https://www.npmjs.com/package/@kontent-ai/model-generator). To regenerate them, make sure your `.env` contains `EXPO_PUBLIC_KONTENT_ENVIRONMENT_ID` and `KONTENT_MANAGEMENT_API_KEY`, then run:

```bash
npm run model:generate
```

The generated files live in the `model/` directory and are excluded from linting.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
