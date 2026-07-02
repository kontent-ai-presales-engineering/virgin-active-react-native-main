# Join a Gym — React Native Demo App

A cross-platform (iOS, Android, Web) demo app built with [Expo](https://expo.dev) and [Kontent.ai](https://kontent.ai), showcasing content-driven mobile development for a gym membership brand. Content — articles, membership plans, FAQs, banners, and pages — is modeled and authored in Kontent.ai and rendered natively across iOS, Android, and web from a single codebase, built for a Virgin Active–style "Join a Gym" content model.

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

## How Kontent.ai delivers content to this app

Kontent.ai is a headless CMS: content is authored and modeled in Kontent.ai, then fetched over HTTP by the app at runtime — there's no coupling to a specific frontend framework or platform, which is what makes it work equally well for this React Native app, a website, or any other client. This project pulls content in a few layers:

- **Delivery API** — a read-only REST (and GraphQL) API that serves published content as JSON. It's the same API a web app or any other client would use to get content. See the [Delivery API reference](https://kontent.ai/learn/docs/apis/openapi/delivery-api/) and [Content items](https://kontent.ai/learn/docs/apis/delivery-api/content-items?sl=1) docs.
- **Delivery SDK** ([`@kontent-ai/delivery-sdk`](https://www.npmjs.com/package/@kontent-ai/delivery-sdk)) — a typed JS/TS client over the Delivery API. `utils/client.ts` creates one client per request via `createDeliveryClient`, and each hook in `hooks/` (e.g. `use-articles.ts`, `use-membership-plans.ts`) queries a content type with `.items().type(...)`. See [Get content from your project](https://kontent.ai/learn/develop/hello-world/get-content/javascript).
- **Strongly typed models** ([`@kontent-ai/model-generator`](https://www.npmjs.com/package/@kontent-ai/model-generator)) — rather than working with loosely typed JSON, `npm run model:generate` introspects your Kontent.ai environment and generates TypeScript types for every content type, snippet, and taxonomy into `model/`, giving autocomplete and compile-time safety when reading `article.elements.title.value` and similar. See [Turn your content types into strongly typed models](https://kontent.ai/learn/develop/build-apps/generate-models/typescript).
- **Rich text rendering** ([`@kontent-ai/rich-text-resolver`](https://www.npmjs.com/package/@kontent-ai/rich-text-resolver)) — Kontent.ai rich text elements are stored as structured HTML with embedded content items/components. `components/RichText.tsx` transforms that into [Portable Text](https://portabletext.org/) and renders it with [`@portabletext/react-native`](https://www.npmjs.com/package/@portabletext/react-native), so headings, lists, links, and inline images all render as native React Native components instead of a WebView. See [Resolve rich text content](https://kontent.ai/learn/develop/build-apps/resolve-rich-text/javascript).
- **Preview Mode** — the Settings tab's "Preview Mode" toggle switches the Delivery client to use the Preview API key (`EXPO_PUBLIC_KONTENT_PREVIEW_API_KEY`) via `defaultQueryConfig.usePreviewMode`, so draft/unpublished content (e.g. an FAQ still in the "Draft" workflow step) becomes visible in the app before it's published. See [Preview configuration](https://kontent.ai/learn/docs/preview/preview-configuration/javascript) and [API key management](https://kontent.ai/learn/docs/apis/api-keys?sl=1).

For a broader overview of building apps against Kontent.ai (any language/framework, not just JavaScript), see [Develop apps with Kontent.ai](https://kontent.ai/learn/develop/develop-with-kontent-ai/javascript).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
