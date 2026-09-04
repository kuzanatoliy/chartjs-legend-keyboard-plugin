import { ChartType } from 'chart.js';
import { type TChartjsKeyboardPluginOptions } from './src/types';

// Define the shape of your plugin's configuration options
export interface MyCustomPluginOptions {
  customColor?: string;
  showLabels?: boolean;
  borderWidth?: number;
}

// Augment Chart.js module namespace
declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsKeyboardPlugin?: TChartjsKeyboardPluginOptions;
  }
}
