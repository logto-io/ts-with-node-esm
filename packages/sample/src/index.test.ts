import { jest } from '@jest/globals';
import { run, runFoo } from './index.js';

describe('normal tests', () => {
  it('should return correct values', async () => {
    expect(run()).toEqual(4);
    expect(runFoo()).toEqual('foo');
  });

  it('should NOT be able to mock ESM when module has been cached', async () => {
    const newFoo = jest.fn().mockReturnValue('bar');
    jest.unstable_mockModule('./foo.js', () => ({
      default: newFoo,
    }));

    // We imported the module before, and ESM is cached, so this is still the original module
    const { runFoo } = await import('./index.js');
    expect(runFoo()).toEqual('foo');
  });
});
