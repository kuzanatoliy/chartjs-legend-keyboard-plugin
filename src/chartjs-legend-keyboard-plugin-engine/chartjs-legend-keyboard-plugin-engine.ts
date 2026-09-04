import { Chart } from 'chart.js';
import { type TChartjsLegendKeyboardPluginOptions } from '../types';
import { NavigationDirection, NavigationStrategy } from '../constants';
import { buildItemLabel, isOnesetChart } from '../helpers';

const NavigationKeys = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ENTER: 'Enter',
  SPACE: ' ',
};

const NavigationKeysSet = new Set([
  NavigationKeys.ARROW_LEFT,
  NavigationKeys.ARROW_UP,
  NavigationKeys.ARROW_RIGHT,
  NavigationKeys.ARROW_DOWN,
  NavigationKeys.HOME,
  NavigationKeys.END,
  NavigationKeys.ENTER,
  NavigationKeys.SPACE,
]);

const DEFAULT_OPTIONS: Required<TChartjsLegendKeyboardPluginOptions> = {
  outlineColor: 'inherit',
  outlineOffset: 'inherit',
  outlineWeight: 'inherit',
  borderRadius: 'inherit',
  direction: NavigationDirection.LTR,
  strategy: NavigationStrategy.BOTH,
  label: 'Chart Legend',
  itemLabelPattern: '{title}, {index} of {count}',
};

export class ChartjsLegendKeyboardPluginEngine {
  private chart: Chart;
  private legendContainer = document.createElement('div');
  private legendOptions: HTMLDivElement[] = [];
  private activeElement = 0;
  private options: Required<TChartjsLegendKeyboardPluginOptions> =
    DEFAULT_OPTIONS;
  private excludedKeys = new Set();

  private buildFocusHandler = (index: number) => () => {
    this.legendOptions[index].style.outline =
      `solid ${this.options.outlineWeight} ${this.options.outlineColor}`;
  };

  private buildBlurHandler = (index: number) => () => {
    this.legendOptions[index].style.outline = '';
  };

  private toggleElement = (index: number) => {
    let isPressed;
    if (isOnesetChart(this.chart.getDatasetMeta(0).type)) {
      this.chart.toggleDataVisibility(index);
      isPressed = this.chart.getDataVisibility(index);
    } else if (this.chart.isDatasetVisible(index)) {
      isPressed = false;
      this.chart.hide(index);
    } else {
      isPressed = true;
      this.chart.show(index);
    }
    this.legendOptions[index].setAttribute('aria-pressed', `${isPressed}`);
    this.chart.update();
  };

  private changeActiveElement = (prev: number, next: number) => {
    this.legendOptions[prev].setAttribute('tabindex', '-1');
    this.legendOptions[next].setAttribute('tabindex', '0');
    this.legendOptions[next].focus();
    this.activeElement = next;
  };

  private buildClickHandler = (index: number) => () => {
    this.changeActiveElement(this.activeElement, index);
    this.toggleElement(index);
  };

  private goPrevious = (index: number) => {
    let next = index - 1;
    if (next < 0) {
      next = this.legendOptions.length - 1;
    }
    this.changeActiveElement(index, next);
  };

  private goNext = (index: number) => {
    let next = index + 1;
    if (next === this.legendOptions.length) {
      next = 0;
    }
    this.changeActiveElement(index, next);
  };

  private buildKeyboardHandler = (index: number) => {
    return (event: KeyboardEvent) => {
      if (this.excludedKeys.has(event.key)) {
        return;
      }
      if (NavigationKeysSet.has(event.key)) {
        event.stopPropagation();
        event.preventDefault();
      }
      switch (event.key) {
        case NavigationKeys.ARROW_LEFT:
          if (this.options.direction === NavigationDirection.LTR) {
            this.goPrevious(index);
          } else {
            this.goNext(index);
          }
          break;
        case NavigationKeys.ARROW_UP:
          this.goPrevious(index);
          break;
        case NavigationKeys.ARROW_RIGHT:
          if (this.options.direction === NavigationDirection.LTR) {
            this.goNext(index);
          } else {
            this.goPrevious(index);
          }
          break;
        case NavigationKeys.ARROW_DOWN:
          this.goNext(index);
          break;
        case NavigationKeys.HOME:
          this.changeActiveElement(index, 0);
          break;
        case NavigationKeys.END:
          this.changeActiveElement(index, this.legendOptions.length - 1);
          break;
        case NavigationKeys.ENTER:
        case NavigationKeys.SPACE:
          this.toggleElement(index);
          break;
      }
      this.chart.update();
    };
  };

  private init = () => {
    this.legendContainer.style.position = 'absolute';
    this.legendContainer.setAttribute('role', 'region');
    this.legendContainer.setAttribute('aria-label', this.options.label);
    this.chart.legend?.legendItems?.map((item, ind, array) => {
      const option = document.createElement('div');
      this.legendOptions.push(option);
      option.addEventListener('click', this.buildClickHandler(ind));
      option.addEventListener('keydown', this.buildKeyboardHandler(ind));
      option.addEventListener('focus', this.buildFocusHandler(ind));
      option.addEventListener('blur', this.buildBlurHandler(ind));
      option.setAttribute(
        'aria-label',
        buildItemLabel(
          this.options.itemLabelPattern,
          item.text,
          ind + 1,
          array.length
        )
      );
      option.setAttribute('aria-pressed', 'true');
      option.setAttribute('role', 'button');
      option.setAttribute('aria-setsize', `${array.length}`);
      option.setAttribute('aria-posinset', `${ind + 1}`);
      option.setAttribute('tabindex', `${this.activeElement === ind ? 0 : -1}`);
      option.style.position = 'absolute';
      option.style.outlineOffset = this.options.outlineOffset;
      option.style.borderRadius = this.options.borderRadius;
      this.legendContainer.append(option);
    });
    this.chart.canvas.insertAdjacentElement('afterend', this.legendContainer);
  };

  private refreshStyles = () => {
    const rect = this.chart.canvas.getBoundingClientRect();
    const offsetRect =
      this.chart.canvas.offsetParent?.getBoundingClientRect() || { x: 0, y: 0 };
    const {
      top: ltop = 0,
      left: lleft = 0,
      width: lwidth = 0,
      height: lheight = 0,
    } = this.chart.legend || {};
    this.legendContainer.style.top = `${rect.top + window.scrollY + ltop - offsetRect.y}px`;
    this.legendContainer.style.left = `${rect.left + window.scrollX + lleft - offsetRect.x}px`;
    this.legendContainer.style.width = `${lwidth}px`;
    this.legendContainer.style.height = `${lheight}px`;
    this.legendOptions.forEach((item, ind) => {
      const { top, left, width, height } =
        // @ts-expect-error need use private property
        this.chart.legend!.legendHitBoxes[ind];
      item.style.top = `${top - ltop}px`;
      item.style.left = `${left - lleft}px`;
      item.style.width = `${width}px`;
      item.style.height = `${height}px`;
    });
  };

  constructor(chart: Chart, options: TChartjsLegendKeyboardPluginOptions = {}) {
    this.chart = chart;
    this.options = {
      ...this.options,
      ...options,
    };
    this.init();
    this.refreshStyles();
    if (options.strategy === NavigationStrategy.HORIZONTAL) {
      this.excludedKeys.add(NavigationKeys.ARROW_DOWN);
      this.excludedKeys.add(NavigationKeys.ARROW_UP);
    }
    if (options.strategy === NavigationStrategy.VERTICAL) {
      this.excludedKeys.add(NavigationKeys.ARROW_LEFT);
      this.excludedKeys.add(NavigationKeys.ARROW_RIGHT);
    }
    window.addEventListener('resize', this.refreshStyles);
  }

  public destroy = () => {
    this.legendContainer.remove();
    window.removeEventListener('resize', this.refreshStyles);
  };
}
