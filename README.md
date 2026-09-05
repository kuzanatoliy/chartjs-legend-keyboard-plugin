# chartjs-legend-keyboard-plugin

The plugin adds keyboard navigation to the Chart.js library. It enables keyboard navigation within the legend, improving accessibility and the overall user experience.

To test the plugin, you can use the [Demo application](https://kuzanatoliy.github.io/chartjs-demo/). / Watch the [Demo](https://youtu.be/W2yLe0SmLUk).

## Installation

#### npm

```bash
npm install @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

#### yarn

```bash
yarn add @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

#### pnpm

```bash
pnpm add @kuzanatoliorg/chartjs-legend-keyboard-plugin
```

## Getting Started

To enable legend keyboard navigation, you need to register the plugin with [Chart.js](https://www.chartjs.org/docs/latest/). Once registered, the plugin will automatically add keyboard support to your chart's legend.

### Chart.js

Register the plugin globally in your application:

```javascript
import Chart from 'chart.js/auto';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

Chart.register(chartjsLegendKeyboardPlugin);
```

Or you can register the plugin for a specific chart:

```javascript
import Chart from 'chart.js/auto';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

const chart = new Chart(ctx, {
    // ...
    plugins: [chartjsLegendKeyboardPlugin]
});
```

### react-chartjs-2

For React applications using `react-chartjs-2`, register the plugin globally with `ChartJS`:

```javascript
import { Chart as ChartJS } from 'chart.js';
import { chartjsLegendKeyboardPlugin } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

ChartJS.register(chartjsLegendKeyboardPlugin);
```

Or you can register the plugin for a specific chart:

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

> **Note:** The plugin were tested on **Chart.js** **`3.x`** and **`4.x`** versions and support versions higher than **`3.x`**.

## Keyboard Navigation

The plugin supports the following keys for navigating the chart legend (behavior may vary slightly depending on the active strategy):

- **Arrow Left**: Navigates to the previous item (or next in RTL mode).
- **Arrow Right**: Navigates to the next item (or previous in RTL mode).
- **Arrow Up**: Navigates to the previous item.
- **Arrow Down**: Navigates to the next item.
- **Home**: Navigates to the first item.
- **End**: Navigates to the last item.
- **Enter** / **Space**: Toggles the visibility of the dataset.

## Configuration

You can configure the plugin's behavior, accessibility labels (pronunciation), and focus styling through the `chartjsLegendKeyboardPlugin` options object.

### Navigation Behavior

The `strategy` property allows you to control which arrow keys can be used for navigation. The `direction` property configures the navigation flow (useful for RTL layouts).

```javascript
const chart = new Chart(ctx, {
    // ...
    options: {
        plugins: {
            chartjsLegendKeyboardPlugin: {
              strategy: 'horizontal',
              direction: 'rtl',
            },
        }
    }
});
```

**Supported Strategies:**

- **`both`** (default) - Navigate through legend items using the Up / Down / Left / Right arrow keys.
- **`horizontal`** - Navigate through legend items using only the Left / Right arrow keys.
- **`vertical`** - Navigate through legend items using only the Up / Down arrow keys.

**Supported Directions:**

- **`ltr`** (default) - Left-to-right navigation.
- **`rtl`** - Right-to-left navigation.

### Accessibility (Pronunciation)

The plugin is built with screen readers in mind. You can customize the `aria-label` applied to the legend container and individual items to control how they are pronounced.

```javascript
const chart = new Chart(ctx, {
    // ...
    options: {
        plugins: {
            chartjsLegendKeyboardPlugin: {
              label: 'Main Chart Legend',
              itemLabelPattern: 'Dataset {title}, item {index} out of {count}',
            },
        }
    }
});
```

- **`label`**: (string) The `aria-label` applied to the main legend region container. _Default: `'Chart Legend'`_.
- **`itemLabelPattern`**: (string) A template used to generate the `aria-label` for each legend item. It supports the following dynamic variables:
  - `{title}`: The text label of the dataset/item.
  - `{index}`: The 1-based index of the current item.
  - `{count}`: The total number of items in the legend. _Default: `'{title}, {index} of {count}'`_.

### Styling

You can customize the appearance of the focus outline applied to legend items when they are navigated via the keyboard.

```javascript
const chart = new Chart(ctx, {
    // ...
    options: {
        plugins: {
            chartjsLegendKeyboardPlugin: {
              outlineColor: '#ff0000',
              outlineOffset: '2px',
              outlineWeight: '3px',
              borderRadius: '4px',
            },
        }
    }
});
```

- **`outlineColor`**: The color of the focus outline. _Default: `'inherit'`_.
- **`outlineWeight`**: The thickness of the focus outline. _Default: `'inherit'`_.
- **`outlineOffset`**: The space between the element and its focus outline. _Default: `'inherit'`_.
- **`borderRadius`**: The border radius of the focus outline to match rounded chart designs. _Default: `'inherit'`_.

## TypeScript

To use the plugin with TypeScript, you need to add types to the `chart.js` module. For example, add a `global.d.ts` file with the following definition:

```typescript
import { ChartType } from 'chart.js';
import { type TChartjsLegendKeyboardPluginOptions } from '@kuzanatoliorg/chartjs-legend-keyboard-plugin';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsLegendKeyboardPlugin?: TChartjsLegendKeyboardPluginOptions;
  }
}
```
