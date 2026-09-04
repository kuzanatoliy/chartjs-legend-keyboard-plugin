import type { TNavigationDirection } from './navigation-direaction.types';
import type { TNavigationStrategy } from './navigation-strategy.types';

export type TChartjsLegendKeyboardPluginOptions = {
  outlineColor?: string;
  outlineOffset?: string;
  outlineWeight?: string;
  borderRadius?: string;
  direction?: TNavigationDirection;
  strategy?: TNavigationStrategy;
  label?: string;
  itemLabelPattern?: string;
};
