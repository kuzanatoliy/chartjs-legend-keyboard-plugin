/**
 * @jest-environment jsdom
 */

import { Chart } from 'chart.js';
import { NavigationDirection, NavigationStrategy } from '../constants';
import { ChartjsLegendKeyboardPluginEngine } from './chartjs-legend-keyboard-plugin-engine';

describe('ChartjsKeyboardPluginEngine', () => {
  const updateSpy = jest.fn();

  const chart = {
    update: updateSpy,
    legend: {
      legendItems: [
        { text: 'Dataset 1' },
        { text: 'Dataset 2' },
        { text: 'Dataset 3' },
      ],
      legendHitBoxes: [
        { top: 10, left: 10, width: 100, height: 100 },
        { top: 110, left: 110, width: 100, height: 100 },
        { top: 210, left: 210, width: 100, height: 100 },
      ],
    },
  } as unknown as Chart;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    //@ts-expect-error need to use mock clean canvas for each test case
    chart.canvas = document.createElement('canvas');
    chart.canvas.setAttribute('tabindex', '0');
    document.body.appendChild(chart.canvas);
  });

  it('Should not have error if legend not existed', () => {
    new ChartjsLegendKeyboardPluginEngine({
      canvas: chart.canvas,
    } as unknown as Chart);
  });

  it('Should init legend engine', () => {
    expect(document.querySelectorAll('[role=button]').length).toBe(0);
    new ChartjsLegendKeyboardPluginEngine(chart);
    expect(document.querySelectorAll('[role=button]').length).toBe(3);
  });

  it('Should destroy legend engine', () => {
    expect(document.querySelectorAll('[role=button]').length).toBe(0);
    const engine = new ChartjsLegendKeyboardPluginEngine(chart);
    expect(document.querySelectorAll('[role=button]').length).toBe(3);
    engine.destroy();
    expect(document.querySelectorAll('[role=button]').length).toBe(0);
  });

  it.each`
    eventKey
    ${'ArrowLeft'}
    ${'ArrowUp'}
  `(
    'Should trigger $event and navigate to previous element',
    ({ eventKey }) => {
      new ChartjsLegendKeyboardPluginEngine(chart);
      const [button1, button2, button3] =
        document.querySelectorAll('[role=button]');
      //@ts-expect-error need to set focus
      button1.focus();
      expect(document.activeElement).toBe(button1);
      const event = new KeyboardEvent('keydown', {
        key: eventKey,
        code: eventKey,
        bubbles: true,
      });
      button1.dispatchEvent(event);
      expect(document.activeElement).toBe(button3);
      button3.dispatchEvent(event);
      expect(document.activeElement).toBe(button2);
    }
  );

  it.each`
    eventKey
    ${'ArrowRight'}
    ${'ArrowDown'}
  `('Should trigger $event and navigate to next element', ({ eventKey }) => {
    new ChartjsLegendKeyboardPluginEngine(chart);
    const [button1, button2, button3] =
      document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button2);
    button2.dispatchEvent(event);
    expect(document.activeElement).toBe(button3);
    button3.dispatchEvent(event);
    expect(document.activeElement).toBe(button1);
  });

  it.each`
    eventKey
    ${'ArrowLeft'}
    ${'ArrowRight'}
  `('Should not trigger $event in vertical strategy', ({ eventKey }) => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      strategy: NavigationStrategy.VERTICAL,
    });
    const [button1] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button1);
  });

  it.each`
    eventKey
    ${'ArrowUp'}
    ${'ArrowDown'}
  `('Should not trigger $event in horizontal strategy', ({ eventKey }) => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      strategy: NavigationStrategy.HORIZONTAL,
    });
    const [button1] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button1);
  });

  it('Should navigate to next elemeng by ArrowLeft in rtl', () => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      direction: NavigationDirection.RTL,
    });
    const [button1, button2] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button2);
  });

  it('Should navigate to previous elemeng by ArrowRight in rtl', () => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      direction: NavigationDirection.RTL,
    });
    const [button1, , button3] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      code: 'ArrowRight',
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button3);
  });

  it('Should not trigger action', () => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      direction: NavigationDirection.RTL,
    });
    const [button1] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: 'A',
      code: 'A',
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button1);
  });

  it('Should navigate to end', () => {
    new ChartjsLegendKeyboardPluginEngine(chart, {
      direction: NavigationDirection.RTL,
    });
    const [button1, , button3] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(document.activeElement).toBe(button1);
    const event = new KeyboardEvent('keydown', {
      key: 'End',
      code: 'End',
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(document.activeElement).toBe(button3);
  });

  it('Should navigate to home', () => {
    new ChartjsLegendKeyboardPluginEngine(chart);
    const [button1, , button3] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button3.focus();
    expect(document.activeElement).toBe(button3);
    const event = new KeyboardEvent('keydown', {
      key: 'Home',
      code: 'Home',
      bubbles: true,
    });
    button3.dispatchEvent(event);
    expect(document.activeElement).toBe(button1);
  });

  it('Should validate click', () => {
    let toggle = true;
    const localChart = {
      ...chart,
      getDatasetMeta: jest.fn().mockReturnValue({ type: 'pie' }),
      toggleDataVisibility: jest.fn().mockImplementation(() => {
        toggle = !toggle;
      }),
      getDataVisibility: jest.fn().mockImplementation(() => toggle),
    } as unknown as Chart;
    new ChartjsLegendKeyboardPluginEngine(localChart);
    const [button1] = document.querySelectorAll('[role=button]');
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    const event = new MouseEvent('click', {
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('false');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(1);
    expect(localChart.toggleDataVisibility).toHaveBeenCalledTimes(1);
    expect(localChart.getDataVisibility).toHaveBeenCalledTimes(1);
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(2);
    expect(localChart.toggleDataVisibility).toHaveBeenCalledTimes(2);
    expect(localChart.getDataVisibility).toHaveBeenCalledTimes(2);
  });

  it.each`
    eventKey
    ${'Enter'}
    ${' '}
  `('Sould validate toggling for one set charts', ({ eventKey }) => {
    let toggle = true;
    const localChart = {
      ...chart,
      getDatasetMeta: jest.fn().mockReturnValue({ type: 'pie' }),
      toggleDataVisibility: jest.fn().mockImplementation(() => {
        toggle = !toggle;
      }),
      getDataVisibility: jest.fn().mockImplementation(() => toggle),
    } as unknown as Chart;
    new ChartjsLegendKeyboardPluginEngine(localChart);
    const [button1] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('false');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(1);
    expect(localChart.toggleDataVisibility).toHaveBeenCalledTimes(1);
    expect(localChart.getDataVisibility).toHaveBeenCalledTimes(1);
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(2);
    expect(localChart.toggleDataVisibility).toHaveBeenCalledTimes(2);
    expect(localChart.getDataVisibility).toHaveBeenCalledTimes(2);
  });

  it.each`
    eventKey
    ${'Enter'}
    ${' '}
  `('Sould validate toggling for one set charts', ({ eventKey }) => {
    let toggle = true;
    const localChart = {
      ...chart,
      getDatasetMeta: jest.fn().mockReturnValue({ type: 'line' }),
      hide: jest.fn().mockImplementation(() => {
        toggle = false;
      }),
      show: jest.fn().mockImplementation(() => {
        toggle = false;
      }),
      isDatasetVisible: jest.fn().mockImplementation(() => toggle),
    } as unknown as Chart;
    new ChartjsLegendKeyboardPluginEngine(localChart);
    const [button1] = document.querySelectorAll('[role=button]');
    //@ts-expect-error need to set focus
    button1.focus();
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('false');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(1);
    expect(localChart.hide).toHaveBeenCalled();
    expect(localChart.isDatasetVisible).toHaveBeenCalledTimes(1);
    button1.dispatchEvent(event);
    expect(button1.getAttribute('aria-pressed')).toBe('true');
    expect(localChart.getDatasetMeta).toHaveBeenCalledTimes(2);
    expect(localChart.show).toHaveBeenCalled();
    expect(localChart.isDatasetVisible).toHaveBeenCalledTimes(2);
  });
});
