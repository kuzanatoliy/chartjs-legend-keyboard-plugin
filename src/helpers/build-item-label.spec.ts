import { buildItemLabel } from './build-item-label';

describe('isOnesetChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Should validate type $type`, () => {
    expect(
      buildItemLabel('{title}, {index} {count}', 'Test title', 1, 10)
    ).toBe('Test title, 1 10');
  });
});
