/**
 * @jest-environment jsdom
 */

import { Chart } from 'chart.js';
import { chartjsLegendKeyboardPlugin } from './chartjs-legend-keyboard-plugin';
import { ChartjsLegendKeyboardPluginEngine } from './engines';

const mockDestroy = jest.fn();

jest.mock('./engines', () => {
  const original = jest.requireActual('./engines');

  return {
    ...original,
    ChartjsLegendKeyboardPluginEngine: jest
      .fn()
      .mockImplementation(function () {
        //@ts-expect-error mock destroy function
        this.destroy = mockDestroy;
      }),
  };
});

describe('chartjsLegendKeyboardPlugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should init chart once', () => {
    const options = {};
    const chart = {} as unknown as Chart;
    chartjsLegendKeyboardPlugin.beforeDraw!(
      chart,
      { cancelable: true },
      options
    );
    expect(ChartjsLegendKeyboardPluginEngine).toHaveBeenCalledWith(
      chart,
      options
    );
    expect(ChartjsLegendKeyboardPluginEngine).toHaveBeenCalledTimes(1);
    chartjsLegendKeyboardPlugin.beforeDraw!(
      chart,
      { cancelable: true },
      options
    );
    expect(ChartjsLegendKeyboardPluginEngine).toHaveBeenCalledTimes(1);
  });

  it('Should destroy chart', () => {
    const chart = {} as unknown as Chart;
    chartjsLegendKeyboardPlugin.beforeDraw!(chart, { cancelable: true }, {});
    chartjsLegendKeyboardPlugin.beforeDestroy!(chart, {}, {});
    expect(mockDestroy).toHaveBeenCalled();
  });

  it('Should remove engine instance', () => {
    const chart = {} as unknown as Chart;
    chartjsLegendKeyboardPlugin.beforeDraw!(chart, { cancelable: true }, {});
    expect(ChartjsLegendKeyboardPluginEngine).toHaveBeenCalledTimes(1);
    chartjsLegendKeyboardPlugin.afterDestroy!(chart, {}, {});
    chartjsLegendKeyboardPlugin.beforeDraw!(chart, { cancelable: true }, {});
    expect(ChartjsLegendKeyboardPluginEngine).toHaveBeenCalledTimes(2);
  });
});
