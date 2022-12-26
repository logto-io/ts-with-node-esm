import foo, { value, getValue } from './foo.js'; 

export const run = () => {
  return value + getValue();
}

export const runFoo = () => foo();

console.log('run', run());
console.log('runFoo', runFoo());
