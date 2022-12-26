import { jest } from '@jest/globals';

const newFoo = jest.fn().mockReturnValue('bar');
const getValue = jest.fn().mockReturnValue(2);

jest.unstable_mockModule('./foo.js', () => ({
  getValue,
  value: 1,
  default: newFoo
}));

const { run, runFoo } = await import('./index.js');

describe('normal tests', () => {
  it('should be able to mock ESM', async () => {
    expect(runFoo()).toEqual('bar');
    expect(run()).toEqual(3);

    expect(newFoo).toHaveBeenCalledTimes(2);
    expect(getValue).toHaveBeenCalledTimes(2);
  });
});
