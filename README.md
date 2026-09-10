# chartjs-legend-keyboard-plugin

[![npm version](https://img.shields.io/npm/v/@kuzanatoliorg/chartjs-legend-keyboard-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-legend-keyboard-plugin) [![npm downloads](https://img.shields.io/npm/dm/@kuzanatoliorg/chartjs-legend-keyboard-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-legend-keyboard-plugin) [![License](https://img.shields.io/github/license/kuzanatoliy/chartjs-legend-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-legend-keyboard-plugin/blob/main/LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/kuzanatoliy/chartjs-legend-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-legend-keyboard-plugin/stargazers) [![GitHub issues](https://img.shields.io/github/issues/kuzanatoliy/chartjs-legend-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-legend-keyboard-plugin/issues)

🚀 **[Try the Interactive Demo](https://kuzanatoliy.github.io/chartjs-demo/)** | 📺 **[Watch the Video Walkthrough](https://youtu.be/W2yLe0SmLUk)**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Vanilla Chart.js Execution](#vanilla-chartjs-execution)
  - [React Framework Integration](#react-framework-integration-react-chartjs-2)
- [Keyboard Mappings](#keyboard-mappings)
- [Configuration Options](#configuration-options)
  - [Navigation Behavior](#navigation-behavior)
  - [Accessibility Pronunciation](#accessibility-pronunciation)
  - [Inline Canvas Styling](#inline-canvas-styling)
- [TypeScript Definitions](#typescript-definitions)

---

## Features

- ♿ **a11y Compliant:** Enhances screen reader and keyboard-only interaction within standard HTML canvas components.
- 🔄 **Dynamic Legends:** Seamlessly toggle dataset visibilities directly via keyboard focus blocks.
- 🗣️ **Screen Reader Friendly:** Built-in template configuration to customize aria-label announcements.
- 🎨 **Highly Customizable Styles:** Deep configuration properties to fine-tune focus rings and layouts.

---

## Installation

### npm

```bash
npm install @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

### yarn

```bash
yarn add @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

### pnpm

```bash
pnpm add @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

---

## Getting Started

To enable legend keyboard navigation, you need to register the plugin with [Chart.js](https://chartjs.org). Once registered, the plugin will automatically add comprehensive keyboard support to your chart's legend.

### Vanilla Chart.js Execution

Register the plugin globally in your application:

```javascript
import Chart from 'chart.js/auto';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

Chart.register(chartjsLegendKeyboardPlugin);
```

Or you can register the plugin for a specific chart instance:

```javascript
import Chart from 'chart.js/auto';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

const chart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    plugins: [chartjsLegendKeyboardPlugin]
});
```

### React Framework Integration (`react-chartjs-2`)

For React applications using `react-chartjs-2`, register the plugin globally with `ChartJS`:

```javascript
import { Chart as ChartJS } from 'chart.js';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

ChartJS.register(chartjsLegendKeyboardPlugin);
```

Or you can register the plugin for a specific chart component:

```javascript
import { Bar } from 'react-chartjs-2';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

function MyChart() {
  return (
    <Bar
      data={data}
      options={options}
      plugins={[chartjsLegendKeyboardPlugin]}
    />
  );
}
```

> 💡 **Compatibility Note:** Fully tested and optimized for **Chart.js `3.x`** and **`4.x+`** frameworks.

---

## Keyboard Mappings

The plugin supports the following keys for navigating the chart legend UI (behavior may vary slightly depending on the active strategy):

| Input Command | Action & Behavioral Mapping |
| :-- | :-- |
| `Arrow Left` | Focus previous item _(Reversed in RTL mode)_ |
| `Arrow Right` | Focus next item _(Reversed in RTL mode)_ |
| `Arrow Up` | Focus previous item node |
| `Arrow Down` | Focus next item node |
| `Home` | Instantly jump focus to the first available legend element |
| `End` | Instantly jump focus to the final available legend element |
| `Enter` / `Space` | Toggles the targeted visibility configuration of the focused dataset |

---

## Configuration Options

Fine-tune keyboard targeting behaviors via the main `chartjsLegendKeyboardPlugin` configuration envelope:

```javascript
const chart = new Chart(ctx, {
    options: {
        plugins: {
            chartjsLegendKeyboardPlugin: {
                // Select navigation mechanic: 'both' (default) | 'horizontal' | 'vertical'
                strategy: 'both',
                // Interface text layout flow: 'ltr' (default) | 'rtl'
                direction: 'ltr',

                // Main legend container configuration
                label: 'Chart Legend',
                // Dynamic template pattern representation
                itemLabelPattern: '{title}, {index} of {count}',

                // Focus ring decoration configurations
                outlineColor: 'inherit',
                outlineWeight: 'inherit',
                outlineOffset: 'inherit',
                borderRadius: 'inherit'
            },
        }
    }
});
```

### Navigation Behavior

- **`both` _(Default)_**: Navigate through legend items smoothly using all arrow inputs (`Up` / `Down` / `Left` / `Right`).
- **`horizontal`**: Multi-column mapping restriction; maps focus switching navigation strictly to `Left` / `Right` arrows.
- **`vertical`**: Single-column layout mapping restriction; maps focus switching navigation strictly to `Up` / `Down` arrows.
- **`direction`**: Determines directional layout indexing. Supports `ltr` _(Default)_ and `rtl` modes.

### Accessibility Pronunciation

Customize assistive announcements for standard a11y screen reading hardware setups:

- **`label`**: _(string)_ The `aria-label` applied to the main legend container region. _Default: `'Chart Legend'`_.
- **`itemLabelPattern`**: _(string)_ Template pattern used to generate the dynamic `aria-label` for each legend item. It supports the following variables:
  - `{title}`: The text label string of the active dataset/item.
  - `{index}`: The 1-based index calculation of the current item.
  - `{count}`: The total integer number of items available inside the legend context. _Default: `'{title}, {index} of {count}'`_.

### Inline Canvas Styling

Fine-tune specific focus outlines when components gain keyboard state focuses:

- **`outlineColor`**: Custom CSS color declaration string for the active focus indicator line. _Default: `'inherit'`_.
- **`outlineWeight`**: Border line weight density parameter (e.g., `'3px'`). _Default: `'inherit'`_.
- **`outlineOffset`**: Space threshold separation value positioned outside the container elements. _Default: `'inherit'`_.
- **`borderRadius`**: Matches layout design aesthetics by rounding specific focus wrapper blocks. _Default: `'inherit'`_.

---

## TypeScript Definitions

Extend your environment types smoothly. Place a `global.d.ts` file within your source directory structures:

```typescript
import { ChartType } from 'chart.js';
import { type TChartjsLegendKeyboardPluginOptions } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsLegendKeyboardPlugin?: TChartjsLegendKeyboardPluginOptions;
  }
}
```
