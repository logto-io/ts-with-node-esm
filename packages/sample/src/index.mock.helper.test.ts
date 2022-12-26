import { jest } from '@jest/globals';
import { createMockUtils } from '@silverhand/esm-helper';

const { mockEsmWithActual } = createMockUtils(jest);

const { default: newFoo } = await mockEsmWithActual('./foo.js', () => ({
  default: jest.fn().mockReturnValue('bar'),
}));

const { run, runFoo } = await import('./index.js');

describe('normal tests', () => {
  it('should be able to mock ESM', async () => {
    expect(runFoo()).toEqual('bar');
    expect(run()).toEqual(4);

    expect(newFoo).toHaveBeenCalledTimes(2);
  });
});
