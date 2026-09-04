import { Chart, type Plugin } from 'chart.js';
import { type TChartjsLegendKeyboardPluginOptions } from './types';
import { ChartjsLegendKeyboardPluginEngine } from './chartjs-legend-keyboard-plugin-engine';

const store = new Map<Chart, ChartjsLegendKeyboardPluginEngine>();

export const chartjsLegendKeyboardPlugin: Plugin = {
  id: 'chartjsLegendKeyboardPlugin',

  beforeDraw: (
    chart: Chart,
    _,
    options: TChartjsLegendKeyboardPluginOptions
  ) => {
    if (!store.get(chart)) {
      store.set(chart, new ChartjsLegendKeyboardPluginEngine(chart, options));
    }
  },

  beforeDestroy: (chart: Chart) => {
    store.get(chart)?.destroy();
  },

  afterDestroy: (chart: Chart) => {
    store.delete(chart);
  },
};
