import type { TNavigationStrategy } from '../types';

type TNavigationStrategyKey = 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

export const NavigationStrategy: Record<
  TNavigationStrategyKey,
  TNavigationStrategy
> = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  BOTH: 'both',
} as const;
