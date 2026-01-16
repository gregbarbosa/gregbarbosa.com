# Google Analytics 4 Integration

This project uses a custom, performance-optimized Google Analytics 4 (GA4) integration designed for Astro with **Partytown** and **View Transitions** support.

## Features

- **Performance-First**: Offloads Google Analytics scripts to a web worker using Partytown, keeping the main thread free for transitions and interactions.
- **GDPR Compliant**: Implements "Advanced Consent Mode" by default. All tracking (advertising, analytics, and personalization) is set to `denied` until updated by a user.
- **View Transitions Ready**: Automatically tracks page views on client-side navigations without double-counting the initial entry.
- **Internal Referrer Tracking**: Accurately captures the user path across View Transitions, which standard tracking often misses in "Single Page Application" mode.
- **Viewport Size Tracking**: Captures the actual browser window size (`WidthxHeight`) on every page view, which is more actionable than just physical screen resolution.
- **Zero Dependency**: A standalone component in `src/components/GoogleAnalytics.astro`.

## Usage

The component is primary used in `src/components/BaseHead.astro`.

```astro
---
import GoogleAnalytics from './GoogleAnalytics.astro'
---

<head>
	<!-- Other head elements -->
	<GoogleAnalytics id="G-XXXXXXXXXX" />
</head>
```

### Component Props

| Prop                 | Type                    | Default      | Description                                                       |
| :------------------- | :---------------------- | :----------- | :---------------------------------------------------------------- |
| `id`                 | `string`                | **Required** | Your GA4 Measurement ID (starting with `G-`).                     |
| `ad_storage`         | `'granted' \| 'denied'` | `'denied'`   | Permission for ad-related storage.                                |
| `ad_user_data`       | `'granted' \| 'denied'` | `'denied'`   | Permission for user data for advertising.                         |
| `ad_personalization` | `'granted' \| 'denied'` | `'denied'`   | Permission for ad personalization.                                |
| `analytics_storage`  | `'granted' \| 'denied'` | `'denied'`   | Permission for analytics storage.                                 |
| `debug`              | `boolean`               | `false`      | Enables Google Analytics DebugView for real-time troubleshooting. |

## How it Works

### Partytown

The script uses `type="text/partytown"` and is intercepted by the `@astrojs/partytown` integration. To ensure it works, `gtag` and `dataLayer` must be forwarded in `astro.config.mjs`:

```javascript
partytown({
	config: {
		forward: ['dataLayer.push', 'gtag'],
	},
})
```

### View Transitions Logic

The component listens for the `astro:page-load` event.

1.  **Initial Load**: The component is configured with `send_page_view: false` to prevent the default script from firing automatically.
2.  **Tracking**: On `astro:page-load`, a manual `page_view` event is sent with the current `page_title`, `page_location`, and `page_referrer`.
3.  **Referrer**: The script stores the previous URL in memory to ensure that client-side transitions report the correct internal referrer, rather than just the original landing page referrer.

## Privacy Update

If you later add a cookie consent banner, you can update the consent state globally by firing:

```html
<script is:inline>
	gtag('consent', 'update', {
		analytics_storage: 'granted',
	})
</script>
```

## Custom Dimensions in GA4

To see the **Viewport Size** data in your reports, you must register it as a Custom Dimension in the GA4 interface:

1.  Navigate to **Admin** > **Custom Definitions**.
2.  Click **Create Custom Dimension**.
3.  Set the following values:
    - **Dimension Name**: `Viewport Size`
    - **Scope**: `Event`
    - **Description**: `The width and height of the browser window in pixels (WxH).`
    - **Event Parameter**: `viewport_size`
4.  Click **Save**.

_Note: Data will begin appearing in your reports approximately 24 hours after registration._
