# chartjs-keyboard-plugin

The plugin adds keyboard navigation to the Chart.js library. It supports a few navigation strategies that allow specifying usage scenarios and improving user experience.

To test the plugin, you can use the [Demo application](https://kuzanatoliy.github.io/chartjs-demo/).

Watch the [Demo](https://www.youtube.com/watch?v=rJHDyqld9X8).

### Installation

#### npm

```bash
npm install @kuzanatoliorg/chartjs-keyboard-plugin
```

#### yarn

```bash
yarn add @kuzanatoliorg/chartjs-keyboard-plugin
```

#### pnpm

```bash
pnpm add @kuzanatoliorg/chartjs-keyboard-plugin
```

### Getting Started

To enable keyboard navigation, you need to register the plugin with Chart.js. Once registered, the plugin will automatically add keyboard support to your charts.

#### Chart.js

Register the plugin globally in your application:

```javascript
import Chart from 'chart.js/auto';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

Chart.register(chartjsKeyboardPlugin);
```

Or you can register the plugin for a specific chart:

```javascript
import Chart from 'chart.js/auto';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

const chart = new Chart(ctx, {
    // ...
    plugins: [chartjsKeyboardPlugin]
});
```

#### react-chartjs-2

For React applications using `react-chartjs-2`, register the plugin globally with `ChartJS`:

```javascript
import { Chart as ChartJS } from 'chart.js';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

ChartJS.register(chartjsKeyboardPlugin);
```

Or you can register the plugin for a specific chart:

```javascript
import { Bar } from 'react-chartjs-2';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

function MyChart() {
  return (
    <Bar
      data={data}
      options={options}
      plugins={[chartjsKeyboardPlugin]}
    />
  );
}
```

### Keyboard Navigation

The plugin supports the following keys for navigating the chart (behavior may vary slightly depending on the active strategy):

- **Arrow Left**: Navigates to the previous item (or next in RTL mode).
- **Arrow Right**: Navigates to the next item (or previous in RTL mode).
- **Arrow Up**: Navigates to the previous item (or previous dataset in the `balance` strategy).
- **Arrow Down**: Navigates to the next item (or next dataset in the `balance` strategy).
- **Home**: Navigates to the first item.
- **End**: Navigates to the last item.
- **Enter** / **Space**: Activates the data item and displays its tooltip.
- **Escape**: Deactivates the data item and hides its tooltip.

### Configuration

The main property to control keyboard behavior is `strategy`. It allows you to choose one of five strategies that can change the user experience.

```javascript
const chart = new Chart(ctx, {
    // ...
    options: {
        plugins: {
            // ...
            chartjsKeyboardPlugin: {
              strategy: 'data-first',
            },
        }
    }
});
```

The plugin supports five strategies:

**balance (default)** - Navigate through datasets using the Up / Down arrow keys and through data items using the Left / Right arrow keys.

**data-first** - Navigate through the dataset from data item to data item and move to the next or previous dataset on corner items.

**dataset-first** - Navigate through data from dataset to dataset and move to the next or previous data item on corner items.

**data** - Navigate through data, activating the data item for all datasets.

**dataset** - Navigate through datasets, activating data in the dataset.

The `direction` property controls the navigation direction and allows configuring the plugin to work in RTL mode.

```javascript
const chart = new Chart(ctx, {
    // ...
    options: {
        plugins: {
            // ...
            chartjsKeyboardPlugin: {
              direction: 'rtl',
            },
        }
    }
});
```

The plugin supports `ltr` (default) and `rtl` directions.

### TypeScript

To use the plugin with TypeScript, you need to add types to the `chart.js` module. For example, add a `global.d.ts` file with the following definition:

```typescript
import { ChartType } from 'chart.js';
import { type TChartjsKeyboardPluginOptions } from '@kuzanatoliorg/chartjs-keyboard-plugin';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsKeyboardPlugin?: TChartjsKeyboardPluginOptions;
  }
}
```
