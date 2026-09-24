# open-slide workspace

Slides as React components. Each slide lives under `slides/<id>/index.tsx` and default-exports an array of page components. The `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode — you just write the pages.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the dev server and create a new slide at `slides/<your-slide>/index.tsx`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload. |
| `pnpm build` | Build a static bundle you can deploy. |
| `pnpm preview` | Preview the built bundle locally. |

## Included example decks

The demo workspace includes these product and planning decks:

| Deck | Entry point |
| --- | --- |
| AI Stock 產品業務推廣規劃 | [`ai-stock-product-launch`](./slides/ai-stock-product-launch/index.tsx) |
| 廷豐 AI 股票交易 | [`ai-stock-workbench`](./slides/ai-stock-workbench/index.tsx) |
| 應用開發部門｜產品版圖與 30／90／365 天計畫 | [`application-development-roadmap`](./slides/application-development-roadmap/index.tsx) |
| FinDB | [`findb-overview`](./slides/findb-overview/index.tsx) |
| Travis AI｜16 交易人格設計進度 | [`personality-system-design`](./slides/personality-system-design/index.tsx) |
| 廷豐 AI 晨報 | [`tingfong-ai-morning-report`](./slides/tingfong-ai-morning-report/index.tsx) |

## Authoring a slide

```tsx
// slides/my-slide/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Every page renders into a fixed **1920 × 1080** canvas — design with absolute pixel values. Put images, videos, and fonts under `slides/<id>/assets/` and import them directly.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide.

## Navigation

- Arrow keys / PageUp / PageDown move between pages.
- `F` enters fullscreen play mode; Esc exits.
- In play mode: Space / → next, ← prev.

## Claude Code integration

This workspace ships with Claude Code skills preconfigured under `.claude/skills/` and `.agents/skills/`. Ask Claude Code to "make slides about X" and the `create-slide` skill takes over. Use `apply-comments` to iterate via inspector-style markers inside your source.

## Config

Optional `open-slide.config.ts` at the workspace root:

```ts
import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  port: 5173,
};

export default openSlideConfig;
```

Supported fields: `slidesDir`, `port`.
