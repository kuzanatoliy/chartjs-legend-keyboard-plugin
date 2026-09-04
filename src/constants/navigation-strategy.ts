import type { TNavigationStrategy } from '../types';

type TNavigationStrategyKey = 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

export const NavigationStrategy: Record<
  TNavigationStrategyKey,
  TNavigationStrategy
> = {
  HORIZONTAL: 'horyzontal',
  VERTICAL: 'vertical',
  BOTH: 'both',
} as const;
